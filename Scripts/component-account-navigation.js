window.addEventListener('DOMContentLoaded', (event) => {
    
    // Mobile Account Navigation click function
    var windowWidth = $xa(window).width();

        if(windowWidth <= 991){
            $xa(".account-nav").on("click",function(){
                $xa(this).toggleClass("active");
            });
        }
    $xa(".account-nav").empty();    
    $xa(".account-nav-content a").each(function(){
        if($xa(this).hasClass("active")){
            var activeText = $xa(this).text();
            $xa(".account-nav").append(activeText);
        }
    });
});
