



if ($xa(".component.account-subscriptions").length && !$xa('body').hasClass('on-page-editor')) {
    document.addEventListener("DOMContentLoaded", function () {
        // Handler when the DOM is fully loaded
 
        // hide all subscribe buttons
        $xa(".subscribe-bar").hide();
        $xa(".account-subscriptions__item-subscription-salesforce-id").hide();


        function ShowSubscribingForComponent(subscriptionComponentCta)
        {
            subscriptionComponentCta.find(".subscribe-bar").hide();
            subscriptionComponentCta.find(".account-subscribing").show();

        }
        function ShowCancelingForComponent(subscriptionComponentCta)
        {
            subscriptionComponentCta.find(".subscribe-bar").hide();
            subscriptionComponentCta.find(".account-subscribe-canceling").show();

        }
        function ShowSubscribeForComponent(subscriptionComponentCta)
        {
            subscriptionComponentCta.find(".subscribe-bar").hide();
            subscriptionComponentCta.find(".account-subscribe").show();
        }
        function ShowUnSubscribeForComponent(subscriptionComponentCta)
        {
            subscriptionComponentCta.find(".subscribe-bar").hide();
            subscriptionComponentCta.find(".account-unsubscribe").show();
        }
        function ShowErrorForComponent(subscriptionComponentCta)
        {
            subscriptionComponentCta.find(".subscribe-bar").hide();
            subscriptionComponentCta.parent().find(".error-subscribe").show();
            subscriptionComponentCta.find(".account-subscribe").show();
        }

        
        $xa(".account-subscriptions__item-cta").each(function() {     

            var subscriptionComponent = $xa(this).closest(".account-subscriptions__item-innerwrapper");           
            var subscriptionId = subscriptionComponent.find(".account-subscription-salesforceId").text();

            if($xa.inArray(subscriptionId, subscriptionIds) !== -1){
                ShowUnSubscribeForComponent(subscriptionComponent);
            }
            else{
                ShowSubscribeForComponent(subscriptionComponent);
            }


            
            // $xa.ajax({
            //     method: "GET",
            //     url: isSubscribedUrl,
            //     data: { subscriptionId: subscriptionId},
            //     success: function (data) {
            //         if (data.subscribed) {                        
            //             ShowUnSubscribeForComponent(subscriptionComponent);
            //         }
            //         else{
            //             ShowSubscribeForComponent(subscriptionComponent);
            //         }
            //     }
            // });
        });

        $xa(".account-subscribe").click(function () {
            var subscriptionComponent = $xa(this).closest(".account-subscriptions__item-innerwrapper");    
            
            ShowSubscribingForComponent(subscriptionComponent);
            var subscriptionId = subscriptionComponent.find(".account-subscription-sitecoreId").text();

            $xa.ajax({
                method: "POST",
                url: subscribeUrl,
                data: { subscriptionId: subscriptionId},
                success: function (data) {
                    if (data.success) {
                        //show success message
                        ShowUnSubscribeForComponent(subscriptionComponent)
                    }
                    else if (!data.isLoggedIn){
                        ShowErrorForComponent(subscriptionComponent)
                    }
                    else {
                        ShowErrorForComponent(subscriptionComponent)
                    }
                }
            });
        });


        $xa(".account-unsubscribe").click(function () {
            var subscriptionComponent = $xa(this).closest(".account-subscriptions__item-innerwrapper");    
            
            ShowCancelingForComponent(subscriptionComponent);
            var subscriptionId = subscriptionComponent.find(".account-subscription-sitecoreId").text();

            $xa.ajax({
                method: "POST",
                url: unSubscribeUrl,
                data: { subscriptionIds: [subscriptionId]},
                success: function (data) {
                    if (data.success) {
                        //show success message
                        ShowSubscribeForComponent(subscriptionComponent)

                    }
                    else if (!data.isLoggedIn){
                        ShowErrorForComponent(subscriptionComponent)
                    }
                    else {

                        ShowErrorForComponent(subscriptionComponent)
                    }
                }
            });
        });
        
        
    });
}
else if($xa(".component.account-subscriptions").length && $xa('body').hasClass('on-page-editor')) {    
    var subscriptionComponentCta = $xa(".account-subscriptions__item-cta");
    subscriptionComponentCta.find(".account-subscribing").show();
    subscriptionComponentCta.find(".account-unsubscribe").show();
    subscriptionComponentCta.find(".account-subscribe").show();
    subscriptionComponentCta.find(".account-subscribe").show();
    subscriptionComponentCta.find(".account-subscribe-canceling").show();
    subscriptionComponentCta.find(".error-subscribe").show();
    
}
