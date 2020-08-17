



if ($xa(".component.account-topics").length && !$xa('body').hasClass('on-page-editor')) {

    var accountTopics = []; 
    function updateAccountTopics(){
        accountTopics = [];
        $xa(".account-topics input:checked").each(function (){
            accountTopics.push($xa(this).attr("name"));
        });
    }

    function disableAccountTopicsButton(){
        if(accountTopics.length){
            $xa(".account-topics__btn").removeClass("disabled");
        }
        else{
            $xa(".account-topics__btn").addClass("disabled");
        }
    }

    $xa(".account-topics input").click(function (){
        updateAccountTopics();
        disableAccountTopicsButton();
    });

    $xa(".account-topics__btn").click(function () {

        $xa.ajax({
            method: "POST",
            url: updateTopics,
            data: { topicIds: accountTopics},
            success: function (data) {
                if (data) {
                    window.location.reload(true);
                }
                else{
                    alert("Topics update failed");
                }
            }
        });
    });

    updateAccountTopics();
    disableAccountTopicsButton();
}