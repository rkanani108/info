    
    $xa("#personalization-banner-form").submit(function (e) {
        e.preventDefault();
        e.returnValue = false;

        $xa("#personalization-success").hide();
        $xa('#personalization-banner-form :input[type="submit"]').prop('disabled', true);

        var jobTitle = $xa("#edit-job-title").val();
        var jobFunctionId = $xa("#job-function-select").val();
        var departmentId = $xa("#department-select").val();
        
        $xa.ajax({
            type: 'POST',
            url: personalizationUrl,
            data: { 
                 jobTitle: jobTitle,
                 jobFunctionId: jobFunctionId,
                 departmentId: departmentId
                },
            success: function (data) {
                if (data.Error) {
                    appendPersonalizationError(data.Error)
                }
                else{
                    personalizationSuccess();
                }
            },
            error: function () {
                appendPersonalizationError("personalization general error");
            }
        });
    });

    //This form has the same class as the Edit Profile form, so the validation is handled in component-edit-profile.js

    function appendPersonalizationError(errorMessage){
        $xa("#personalization-error").html("<span class=\"error\"></span>");
        $xa("#personalization-error").append(errorMessage);
        $xa("#personalization-error").show();
        $xa('#personalization-banner-form :input[type="submit"]').prop('disabled', false);
    }

    function personalizationSuccess(){
        $xa("#personalization-success").show();
    }