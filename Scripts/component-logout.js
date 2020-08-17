$xa("#logout-button").click(function (){
    $xa.ajax({
        method: "POST",
        url: logoutUrl,
        success: function (data) {
            window.location.href = logoutRedirectUrl;
        }
    });
});