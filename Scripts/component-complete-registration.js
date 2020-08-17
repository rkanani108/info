var completeRegistrationGeneralErrorHtml = "";
if (typeof completeRegistrationGeneralError !== 'undefined'){
    completeRegistrationGeneralErrorHtml = $xa("<div />").html(completeRegistrationGeneralError).text();
}
    $xa("#employer-select").change(function () {
        var selectedId = $xa("#employer-select").val();
        $xa.each(institutions, function (i, val) {
            if (val.InstitutionId == selectedId) {
                var addressHtml = val.Address1 + "<br />";
                if (val.Address2){
                    addressHtml += val.Address2 + "<br />";
                }
                addressHtml += val.City + ", " + val.State + " " + val.PostalCode;
                $xa("#organization-address").html(addressHtml);
            }
        });
    });

    $xa("#complete-registration-form").submit(function (e) {
        e.preventDefault();
        e.returnValue = false;
        var password = $xa("#password-new-field").val();
        var institutionId = $xa("#employer-select").val();
        
        doCompleteRegistration(password, institutionId);
    });

    function doCompleteRegistration(password, institutionId){
        $xa.ajax({
            type: 'POST',
            url: completeRegistrationUrl,
            data: { password: password, institutionId: institutionId },
            success: function (data) {
                if (data.Message) {
                    var message = data.Message;
                    appendRegistrationError(message);
                    return false;
                }
                $xa("#complete-registration-form").off('submit');
                window.location.href = registrationSuccessUrl;
            },
            error: function () {
                appendRegistrationError(completeRegistrationGeneralErrorHtml);
            }
        });
    }
    
    function appendRegistrationError(errorMessage){
        $xa("#complete-registration-error").html("<span class=\"fa fa-exclamation-triangle exclamation-triangle\"></span>");
        $xa("#complete-registration-error").append(errorMessage);
        $xa("#complete-registration-error").show();
        $xa(".component-reset-password__successwrapper").hide();
    }

    $xa('#complete-registration-form').validate();
