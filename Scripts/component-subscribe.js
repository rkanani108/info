



if ($xa(".component.subscribe").length && !$xa('body').hasClass('on-page-editor')) {
    document.addEventListener("DOMContentLoaded", function () {
        // Handler when the DOM is fully loaded

        // Hide all components 
        function ShowSubscriptionElement(subscriptionComponent, cssClassName)
        {
            subscriptionComponent.find(".btn-subscribe-login").hide();
            subscriptionComponent.find(".subscribe-success").hide();   
            subscriptionComponent.find(".subscribe-subscribed").hide();   
            subscriptionComponent.find(".btn-subscribe-subscribe").hide();
        
            subscriptionComponent.find("."+cssClassName).show();            
        }
        function ShowSubscriptionLogin()
        {
            $xa(".btn-subscribe-login").show();
            $xa(".subscribe-success").hide();   
            $xa(".subscribe-subscribed").hide();   
            $xa(".btn-subscribe-subscribe").hide();      
        }

        //hide success message
        if(isLoggedIn){
            $xa(".subscribe-body").each(function() {     
                var subscriptionComponent = $xa(this);           
                var subscriptionId = subscriptionComponent.data('subscription-id')
                $xa.ajax({
                    method: "GET",
                    url: isSubscribedUrl,
                    data: { subscriptionId: subscriptionId},
                    success: function (data) {
                        if (data.subscribed) {                        
                            ShowSubscriptionElement(subscriptionComponent, "subscribe-subscribed");
                        }
                        else{
                            ShowSubscriptionElement(subscriptionComponent, "btn-subscribe-subscribe");
                        }
                    }
                });
            });
        }
        else{
            ShowSubscriptionLogin();
        }

        

        $xa(".btn-subscribe-subscribe").click(function () {
            var subscriptionComponent = $xa(this).parents(".subscribe-body")
            var subscriptionId = subscriptionComponent.data('subscription-id')
            $xa.ajax({
                method: "POST",
                url: subscribeUrl,
                data: { subscriptionId: subscriptionId},
                success: function (data) {
                    if (data.success) {
                        //show success message
                        ShowSubscriptionElement(subscriptionComponent, "subscribe-success");
                    }
                    else if (!data.isLoggedIn){
                        ShowSubscriptionLogin();
                    }
                    else {
                        alert("Subscribe failed");
                    }
                }
            });
        });
        

        $xa(".btn-subscribe-login").click(function () {
            var returnUrl = window.location.href;
            window.location.href = window.location.origin + loginUrl + "?returnUrl=" + encodeURIComponent(returnUrl);
        });
    });
}
else if ($xa(".component.subscribe").length && $xa('body').hasClass('on-page-editor')) {
    
        $xa(".btn-subscribe-login").show();
        $xa(".subscribe-success").show();   
        $xa(".subscribe-subscribed").show();   
        $xa(".btn-subscribe-subscribe").show();      
}
