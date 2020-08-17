



if ($xa(".unsubscribe-all-component").length && !$xa('body').hasClass('on-page-editor')) {
    document.addEventListener("DOMContentLoaded", function () {
        // Handler when the DOM is fully loaded
        $xa(".btn-unsubscribe-all").click(function () {
            $xa(this).html(unsubscribingLabel);
            $xa.ajax({
                method: "POST",
                url: unsubscribeAllUrl,
                success: function (data) {
                    
                    $xa(".btn-unsubscribe-all").html(unsubscribeAllLabel);
                    if (data) {
                        // Update all subscription buttons on the page, or refresh the page
                        
                        $xa(".account-subscriptions__item-subscribe").hide();
                        $xa(".account-subscribe").show();
                    }
                    else {
                        Console.Log("Subscribe failed");
                    }
                }
            });
        });        
    });
}
