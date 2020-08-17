;(function($) {

    var config = {
        selectors: {
            body:"body",
            main:"main",
            header:"header",
            hero:".hero.expert",
            wrap:".expert-wrap",
            firstName:".first-name",
            lastName:".last-name",
            postNominal:".post-nominal",
            expertPhoto:".expert-photo",
            expertTitle:".expert-title",
            anchorLinksComponent:".anchor-links",
            anchorLinksNav:"#anchor-links__nav",
            anchorLinksList:'.anchor-links--list',
            anchorLinkListNavItem:'.nav-item',
            anchorLinksTitle:".anchor-links--title",
            progressBar:".progress-bar"
        }
    }

    var $expertTitle,
        $truncatedExpertTitle

    var heroHeight = 0,
        documentHeight = 0,
        scrollAt = 0,
        currentPosition = 0,
        headerHeight = 0;

    var fn,
        ln,
        pn
    
    // listeners
    
    var scrollPosition = function() {
        scrollAt = $(document).scrollTop();
        documentHeight = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        currentPosition = (scrollAt/documentHeight*100);
        if(currentPosition >= 0 && currentPosition <= 100) {
            $progressBar.css({'width': (currentPosition) + '%', 'transition': '0s'});
        } else {
            $progressBar.css({'width': '100%', 'transition': '0s'});
        }
    }

    var makeTheHeroSlim = function() {
        if(scrollAt <= heroHeight) {
            $hero.removeClass('slim');
            $hero.css({'top': 'initial'});
            $expertTitle.addClass('display-none');
            $wrap.children().not('.expert-title').removeClass('display-none');
            $expertTitle.text($expertTitle.data('title'));
            $('.page-structure:first').css({'margin-top': 'initial'});
            $($anchorLinksNav).detach().appendTo($anchorLinksComponent);
            resetAnchorLinkList();
        } else {
            truncateExpertTitle();
            watchAnchorLinkList();
            $hero.addClass('slim');
            $hero.css({'top': headerHeight});
            $expertTitle.removeClass('display-none');
            $wrap.css({'padding': '15px 10%', 'width': '100%'});
            $($anchorLinksNav).detach().insertAfter($expertTitle);
            $anchorLinksList.addClass('slim');
            $anchorLinksNav.removeClass('display-none');
            if(document.documentElement.clientWidth >= 786) {    
                $wrap.children().not($expertTitle).not($anchorLinksNav).addClass('display-none');
                $('.page-structure:first').css({'margin-top': (heroHeight+headerHeight)});
            } else {
                $wrap.children().not($expertTitle).addClass('display-none');
                $('.page-structure:first').css({'margin-top': (heroHeight+headerHeight+anchorLinksNavHeight)});
            }
        }
    }

    var scrollSpy = function() {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh');
        });
    }

    var watchAnchorLinkList = function() {
        if ($('.nav-link.active')){
            var $activeAnchorLinkListNavItem = $('.nav-link.active');
            $activeAnchorLinkListNavItem.parent().siblings().css( "display", "none" );
            $activeAnchorLinkListNavItem.parent().css( "display", "initial" );
            $activeAnchorLinkListNavItem.removeClass('no-after');
            $('.anchor-links__block').removeClass('expanded');
            $anchorLinksNav.bind('click', openAnchorLinkList);
        }
    }

    var openAnchorLinkList = function(e) {
        var $this = $('.nav-item');
        e.preventDefault();
        $(this).unbind('click', openAnchorLinkList);
        $this.siblings().css( "display", "block" );
        $('.anchor-links__block').addClass('expanded');
        $('.nav-link').addClass('no-after');
    }

    //  util

    var addScrollSpyAttrToBody = function() {
        $body.attr({
            "data-target": "anchor-links__nav",
            "data-spy": "scroll",
            "data-offset": "0"
        });
    }

    var resetAnchorLinkList = function() {
        $('.nav-item').siblings().removeAttr("style");
        $('.nav-link').removeClass('no-after');
        $anchorLinksList.removeClass('slim');
        $('anchor-links__block').removeClass('expanded');
        $('.anchor-links--list li:first-child').find('a').addClass('active');
    }

    var truncateExpertTitle = function() {
        $expertTitle.text($expertTitle.data('title'));
        if($expertTitle.text().length > 50) {
            if(document.documentElement.clientWidth >= 786) {    
                $truncatedExpertTitle = $expertTitle.text().substring(0,50) + '...';
            } else {
                $truncatedExpertTitle = $expertTitle.text().substring(0,20) + '...';
            }
        }
        $($expertTitle).text($truncatedExpertTitle)
    }

    var elHeight = function() {
        heroHeight = $hero.outerHeight();
        headerHeight = $header.outerHeight();
        anchorLinksNavHeight = $anchorLinksNav.outerHeight();
    }

    var fixNameCase = function() {
        fn = $firstName.text().substr(0,1).toUpperCase()+$firstName.text().substr(1).toLowerCase();
        ln = $lastName.text().substr(0,1).toUpperCase()+$lastName.text().substr(1).toLowerCase();
        pn = $postNominal.text().toUpperCase();
        $firstName.text(fn);
        $lastName.text(ln);
        $postNominal.text(pn);
    }

    var joinExpertName = function() {
        $(`<p class='expert-title display-none'>` + fn + ` ` + ln + ` ` + pn + `</p>`).appendTo($wrap);
        $expertTitle = $('.expert-title');
        $expertTitle.attr('data-title', $expertTitle.text());
    }

    // init

    var init = function() {
        getElements();
        setUp();
        attachListeners();
    }

    var getElements = function() {
        $body = $(config.selectors.body);
        $main = $(config.selectors.main);
        $header = $(config.selectors.header);
        $hero = $(config.selectors.hero);
        $wrap = $(config.selectors.wrap,$hero);
        $firstName = $(config.selectors.firstName,$hero);
        $lastName = $(config.selectors.lastName,$hero);
        $postNominal = $(config.selectors.postNominal,$hero);
        $expertPhoto = $(config.selectors.expertPhoto,$hero);
        $anchorLinksComponent = $(config.selectors.anchorLinksComponent);
        $anchorLinksNav = $(config.selectors.anchorLinksNav,$anchorLinksComponent);
        $anchorLinksList = $(config.selectors.anchorLinksList,$anchorLinksComponent);
        $anchorLinkListNavItem = $(config.selectors.anchorLinksListNavItem,$anchorLinksComponent);
        $anchorLinksTitle = $(config.selectors.anchorLinksTitle,$anchorLinksComponent);
        $progressBar = $(config.selectors.progressBar,$hero);
    }

    var setUp = function() {
        addScrollSpyAttrToBody();
        elHeight();
        fixNameCase();
        joinExpertName();
        scrollSpy();
    }

    var attachListeners = function() {
        $(window).on('scroll',scrollPosition);
        $(window).on('scroll',makeTheHeroSlim);
        $(window).on('resize',truncateExpertTitle);
        $(window).on('resize',elHeight);
        $(window).on('resize',scrollPosition);
        $(window).on('resize',makeTheHeroSlim);
        $anchorLinksNav.on('click',openAnchorLinkList);
    }

    if ($('body').hasClass('on-page-editor')) {
        return  
    } else { $(document).ready(init)};

})(jQuery);