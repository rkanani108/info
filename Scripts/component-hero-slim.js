document.addEventListener("DOMContentLoaded", function () {
    try {
        //Don't run this in edit mode.
        if($xa('body').hasClass('on-page-editor')) return;

if(document.querySelector('.hero--wrap') || document.querySelector('.article-wrap')) {

let buttons = document.querySelector('div[class*="buttons"]');
let buttonUL
$xa(buttons).children('ul').get(0).childElementCount > 0 ? buttonUL = $xa(buttons).children('ul') : buttonUL;
let heroHeight = $xa('.hero').outerHeight(true);

let title;
document.querySelector('.article-title') ? title = document.querySelector('.article-title') : title = document.querySelector('.daily-briefing--title');
title.setAttribute('data-title', title.innerHTML);

var body = $xa('body');

body.attr({
    "data-target": "anchor-links__nav",
    "data-spy": "scroll",
    "data-offset": "0"
});

var buttonResize = function(){
    if(document.documentElement.clientWidth >= 786) {
        $xa(buttons).css({'width': 'max-content', 'overflow': 'hidden'});
        } else {
            $xa(buttons).css({'width': '60px', 'overflow': 'hidden'});
        }
    $xa(buttonUL).css({'position': 'relative', 'right': '0'});
    $xa('.article-menu--underlay').remove();
}

// Set display property for Anchor Link Nav Items based on '.active' class

let checkForChanges = function()
{   
    if ($xa('.nav-link.active')){
        const $this = $xa('.nav-link.active');
        $this.parent().siblings().css( "display", "none" );
        $this.parent().css( "display", "initial" );
        $this.removeClass('no-after');
    }
}
 
let $this = $xa('.nav-item');
$this.click(function(e){
  e.preventDefault();
  $this.siblings().css( "display", "block" );
  $xa('.anchor-links__block').addClass('expanded');
  $xa(this).siblings().unbind('click');
  $xa('.nav-link').addClass('no-after');
});

window.addEventListener('scroll', function(e) {

    $xa('[data-spy="scroll"]').each(function () {
        var $spy = $xa(this).scrollspy('refresh');
    });
    
    let s = document.body.scrollTop || document.documentElement.scrollTop;
    let d = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    let position = (s/d) * 100;

    let elementsToHide =  {
        "details" : $xa('.article-details'),
        "image" : $xa('.article-image'),
        "author" : $xa('.article-author'),
        "type" : $xa('.article-type'),
        "contentType" : $xa('.hero--content-type'),
        "byline" : $xa('.article-byline'),
        "date" : $xa('.daily-briefing--date'),
        "readTime" : $xa('.hero--read-time'),
        "hr" : $xa('div[class*="horizontal"]'),
        "anchorLinksTitle" : $xa('.anchor-links--title')
    }

    let hero = document.querySelector('.hero');
    var wrap;
    document.querySelector('.hero--wrap') ? wrap = $xa('.hero--wrap') : wrap = $xa('.article-wrap');
    let firstContainer = document.querySelectorAll('.component.content-grid')[0];
    let buttons = document.querySelector('div[class*="buttons"]');
    var title;
    document.querySelector('.article-title') ? title = $xa('.article-title') : title = $xa('.daily-briefing--title');
    var anchorLinksComponent = $xa('.anchor-links');
    var anchorLinksNav = $xa('#anchor-links__nav');
    var anchorLinksBlock = $xa('.anchor-links__block');
    var anchorLinksList = $xa('.anchor-links--list');

    // Progress Bar

    if (position <= 100 && position >= 0) {
    document.getElementById('progress').setAttribute('style', 'width: ' + (position) + '%; transition: 0s;');
    } else {
    document.getElementById('progress').setAttribute('style', 'width: 100%; transition: 0s;');
    }

    // Hero Slim

    if(s <= heroHeight) {

        checkForChanges();

        // Reset Hero Element Styles

        for (let property in elementsToHide) {
            elementsToHide[property].removeClass('display-none');
        }

        buttons.classList.remove('right');
        $xa(buttons).css({'width': 'max-content'});
        $xa(buttonUL).css({'position': 'relative', 'right': 'unset'});
        $xa(title).text($xa(title).data('title'));
        title.removeClass('left');
        hero.classList.remove('slim');
        $xa('.anchor-links__block').removeClass('expanded');
        wrap.removeAttr("style");

        // Reset Anchor Link List Nav Items classes
        
        $xa('.nav-item').siblings().removeAttr("style");
        $xa('.nav-link').removeClass('no-after');
        $xa('.anchor-links--list li:first-child').find('a').addClass('active');
        
        // Move Anchor Link List back to original position
        
        if ($xa(title).next().is(anchorLinksNav)){
            $xa(anchorLinksNav).detach().appendTo(anchorLinksComponent);
            // anchorLinksList.removeClass('slim');
            firstContainer.setAttribute('style', 'margin-top: 0px;')
        } else {
            firstContainer.setAttribute('style', 'margin-top: 0px;')
            return;
        }
        window.addEventListener('resize', function(){   
        $xa(buttons).css({'width': 'max-content', 'overflow': 'hidden'});
        });
    } else {
        checkForChanges();

        // Hide un-needed Hero elements

        for (let property in elementsToHide) {
            elementsToHide[property].addClass('display-none');
        }

        buttonUL ? buttonUL : buttons.classList.add('display-none');

        buttons.classList.add('right');
        window.addEventListener('resize', function(){
            buttonResize();
        })
        buttonResize();
        $xa(buttonUL).css({'position': 'relative', 'right': '0'});
        $xa('.article-menu--underlay').remove();
        title.addClass('left');
        $xa(title).text($xa(title).data('title'));
        if($xa(title).text().length > 50) {
            if(document.documentElement.clientWidth <= 786) {    
            $xa(title).text($xa(title).text().substr(0,20) + '...');
            } else {
            $xa(title).text($xa(title).text().substr(0,80) + '...');
            }
        }
        hero.classList.add('slim');
        wrap.css({'padding': '10px 10%', 'max-width': '100%'});

        // Move Anchor Link List into Hero Slim

        if ($xa(anchorLinksComponent).next(anchorLinksNav)){
            $xa(anchorLinksNav).detach().insertAfter(title);
            anchorLinksList.addClass('slim');
            firstContainer.setAttribute('style', 'margin-top: ' + (heroHeight) + 'px;');
        } else {
            return;
        }
    };

    checkForChanges();
});

// Button Toggle

$xa('label#menu').click(function() {
    if(document.querySelectorAll('.article-menu--underlay').length === 0) {
        $xa(buttons).parent().before('\<div class="article-menu--underlay"></div>');
        $xa(buttons).css({'width': '80%', 'overflow': 'unset'});
        $xa(buttonUL).css({'position': 'absolute', 'right': '30px'});
    } else {
        $xa('.article-menu--underlay').remove();
        $xa(buttons).css({'width': '60px', 'overflow': 'hidden'});
        $xa(buttonUL).css({'position': 'relative', 'right': '0'});
    }
});

window.addEventListener('resize', function(){
    $xa(title).text($xa(title).data('title'));
    var title;
    document.querySelector('.article-title') ? title = $xa('.article-title') : title = $xa('.daily-briefing--title');
    let s = document.body.scrollTop || document.documentElement.scrollTop;
    
    if(s >= heroHeight && document.documentElement.clientWidth >= 786) {
        $xa(buttons).css({'width': 'max-content', 'overflow': 'hidden'});
        $xa(title).text($xa(title).data('title'));
            if($xa(title).text().length > 50) {
            $xa(title).text($xa(title).text().substr(0,80) + '...');
            }
        } else {
            $xa(buttons).css({'width': '60px', 'overflow': 'hidden'});
            if($xa(title).text().length > 50) {
            $xa(title).text($xa(title).text().substr(0,20) + '...');
            }
        }
    }
)}

} catch(ex) {
    console.log('error: ' + ex);
}

});