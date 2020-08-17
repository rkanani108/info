document.addEventListener("DOMContentLoaded", function () {
    try {
    //Don't run this in edit mode.
    if($xa('body').hasClass('on-page-editor')) return;
    
    var tl = gsap.timeline();

    if(document.querySelector('#hero-daily-briefing-detail-circle')){
        var dailyBriefingHeroSVG = document.querySelector('#hero-daily-briefing-detail-circle');
        // console.log(dailyBriefingHeroSVG)

        if(document.querySelector('.daily-briefing--date')){
            var dateWidth = document.querySelector('.daily-briefing--date').clientWidth;
            var dateHeight = document.querySelector('.daily-briefing--date').clientHeight;
        }

        if(dateWidth && dateHeight) {
        window.onload = triggerAni;
        window.onresize = svgParams;
        }

        function triggerAni() {
            svgParams();
            elemAni();
        }

        function svgParams() {
            if(window.innerWidth > 991) {
                dailyBriefingHeroSVG.style.top = ((dateHeight + 5) * 1.75)
            } else {
                if(dateWidth > 130) {
                    dailyBriefingHeroSVG.style.top = 10;
                } else {
                    dailyBriefingHeroSVG.style.top = dateHeight - 10;
                }
            }
        }

        function elemAni() {
        tl.to(".daily-briefing--title", .25, { backgroundSize: "100%" })
            .to("#hero-daily-briefing-detail-circle", {width: dateWidth*1.5}, '-=3')
            .to("#hero-daily-briefing-detail-circle *", { duration: .75, strokeDashoffset:0 }, '-=.5')
        }
    }
    } catch(ex) {
        console.log('error: ' + ex);
    }
});