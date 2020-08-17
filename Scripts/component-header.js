window.addEventListener('DOMContentLoaded', (event) => {
    
    // Mobile Search Button click function
    $xa(".mobile__search").click(function(){
        if(!$xa(this).hasClass("active")){
            $xa(this).next(".mobile__search-content").addClass("active");
            $xa("body").addClass("mobile-nav-open");
            $xa(this).addClass("active");

            $xa(".mobile__menu-content").removeClass("active");
            $xa(".mobile__main-wrapper .mobile__menu .icon").removeClass("close");

        } else {
            $xa(this).next(".mobile__search-content").removeClass("active");
            $xa("body").removeClass("mobile-nav-open");
            $xa(this).removeClass("active");
        }
    });

    // Mobile Main Navigation Click (Hamburger Button)
    $xa(".mobile__main-wrapper .mobile__menu .icon").click(function(){
        if(!$xa(this).hasClass("close")){
            $xa(".mobile__menu-content").addClass("active");
            $xa("body").addClass("mobile-nav-open");
            $xa(this).addClass("close");

            $xa(".mobile__search-content").removeClass("active");
            $xa(".mobile__search").removeClass("active");
            
        } else {
            $xa(".mobile__menu-content").removeClass("active");
            $xa("body").removeClass("mobile-nav-open");
            $xa(this).removeClass("close");
        }
    });

    $xa(window).resize(function(){

        if($xa(".mobile__search").hasClass("active")){
            $xa(".mobile__search-content").removeClass("active");
            $xa("body").removeClass("mobile-nav-open");
            $xa(".mobile__search").removeClass("active");
        }
        if($xa(".mobile__main-wrapper .mobile__menu .icon").hasClass("close")){
            $xa(".mobile__menu-content").removeClass("active");
            $xa("body").removeClass("mobile-nav-open");
            $xa(".mobile__main-wrapper .mobile__menu .icon").removeClass("close");
        }
        
    });

    // Sticky Header Function
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navHeight = $xa('header').outerHeight();

    $xa(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var navScrollTop = $xa(this).scrollTop();
        var heroHeight = $xa('.hero').outerHeight();
        var s = $xa(document.documentElement).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - navScrollTop) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
            if(s > (navHeight + heroHeight)){
                // Scroll Down && Passed Hero
                if(navScrollTop > lastScrollTop) {
                    $xa('header').css({'top': -navHeight, 'position': 'fixed'});
                    $xa('.hero').css({'top': 0, 'transition': 'top 0s'});
                } else {
                    // Scroll Up && Passed Hero
                    $xa('header').css({'top': 0, 'position': 'fixed', 'transition': 'top 1.3s ease-in-out'});
                    $xa('.hero').css({'top': navHeight, 'transition': 'top 1.3s ease-in-out'}); }
                } else {
                    $xa('header').css({'top': 0, 'position': 'relative','transition': 'top 0s'});
                    $xa('.hero').css({'top': 0, 'left': 0, 'transition': 'top 0s'});
                }
        
        lastScrollTop = navScrollTop;
    }

    // Clone Navigation from desktop to mobile
    var mainNav = $xa(".nav__main-wrapper").html();
    var topNav = $xa(".top-navigation-wrapper").html();

    $xa(".mobile__innerWrapper").append(mainNav);
    $xa(".mobile__innerWrapper").append("<div class='mobile-top-navigation-wrapper'>"+topNav+"</div>");


});

