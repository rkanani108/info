var editProfileGeneralErrorHtml = "";
if (typeof editProfileGeneralError !== 'undefined'){
    editProfileGeneralErrorHtml = $xa("<div />").html(editProfileGeneralError).text();
}
    
    $xa("#edit-profile-form").submit(function (e) {
        e.preventDefault();
        e.returnValue = false;

        $xa('#edit-profile-form :input[type="submit"]').prop('disabled', true);

        var firstName = $xa("#edit-first-name").val();
        var middleName = $xa("#edit-middle-name").val();
        var lastName = $xa("#edit-last-name").val();
        var jobTitle = $xa("#edit-job-title").val();
        var jobFunctionId = $xa("#edit-job-function").val();
        var departmentId = $xa("#edit-department").val();
        var email = $xa("#edit-email-address").val();
        var employer = $xa("#hidden-employer-id").val();
        var phone = $xa("#edit-phone").val();
        var phoneExt = $xa("#edit-phone-extension").val();
        var address = $xa("#edit-shipping-address").val();
        var address2 = $xa("#edit-address-2").val();
        var address3 = $xa("#edit-address-3").val();
        var city = $xa("#edit-city").val();
        var stateId = $xa("#edit-state").val();
        var zip = $xa("#edit-zip").val();
        var countryId = $xa("#edit-country").val();
        
        $xa.ajax({
            type: 'POST',
            url: editProfileUrl,
            data: { 
                 firstName: firstName,
                 middleName: middleName,
                 lastName: lastName,
                 jobTitle: jobTitle,
                 jobFunctionId: jobFunctionId,
                 departmentId: departmentId,
                 email: email,
                 employer: employer,
                 phone: phone,
                 phoneExt: phoneExt,
                 shippingAddress: address,
                 address2: address2,
                 address3: address3,
                 city: city,
                 stateId: stateId,
                 zipCode: zip,
                 countryId: countryId
                },
            success: function (data) {
                if (data.Error) {
                    appendProfileError(data.Error)
                }
                else{
                    window.location.href = editProfileSaveUrl + "?success=edit_profile";
                }
            },
            error: function () {
                appendProfileError(editProfileGeneralErrorHtml);
            }
        });
    });

    function appendProfileError(errorMessage){
        $xa("#profile-error").html("<span class=\"error\"></span>");
        $xa("#profile-error").append(errorMessage);
        $xa("#profile-error").show();
        $xa('#edit-profile-form :input[type="submit"]').prop('disabled', false);
    }

    function formatPhone(e) {
        var ph = this.value.replace(/\D/g,'').substring(0,20);
        var deleteKey = (e.keyCode == 8 || e.keyCode == 46);
        var len = ph.length;
        if(len==0){
            ph=ph;
        }else if(len<3){
            ph='('+ph;
        }else if(len==3){
            ph = '('+ph + (deleteKey ? '' : ') ');
        }else if(len<6){
            ph='('+ph.substring(0,3)+') '+ph.substring(3,6);
        }else if(len==6){
            ph='('+ph.substring(0,3)+') '+ph.substring(3,6)+ (deleteKey ? '' : '-');
        }else if(len<11){
            ph='('+ph.substring(0,3)+') '+ph.substring(3,6)+'-'+ph.substring(6,20);
        }else{
            ph=ph;
        }
        this.value = ph;
    }

    $xa('.phone').keyup(formatPhone);

    $xa("#edit-profile-form .cta").click(function (e){
        e.preventDefault();
        $xa('.component-profile__form .hidden').removeClass('hidden');
        $xa(this).addClass('hidden');
    });


    $xa('.component-profile__form').validate({
        rules: {
            required: true,
            zipcodeUS: true 
        },
        onfocusout: function(element) {
            this.element(element);  
        }
    });

    $xa('#edit-profile-form').change(function() {
        var empty = false;
        $xa('[required]').each(function() {
            if ($xa(this).val() == '') {
                empty = true;
            }
        });

        empty == true ? $xa('.component-profile__container :input[type="submit"]').prop('disabled', true) : $xa('.component-profile__container :input[type="submit"]').prop('disabled', false)
    });

    $xa('#edit-country').change(function(){
        var selectedCountry = $xa(this).val();
        $xa('#edit-state').html("<option></option>");
        $xa.each(statesJson, function(){
            if(this.CountrySalesforceId == selectedCountry){
                $xa('#edit-state').append("<option val=\"" + this.SalesforceId + "\">" + this.Name + "</option>");
            }
        });
    });