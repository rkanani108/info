document.addEventListener("DOMContentLoaded", function () {
    try {
    //Don't run this in edit mode.
    if($xa('body').hasClass('on-page-editor')) return;
    
    var tl = gsap.timeline();

var title = document.querySelectorAll('.daily-briefing--title');
if(title.length > 0) {  //Check if we're on a DB page and this element exists
    var datePublished = document.querySelector('.daily-briefing--date-published');

    var bigCircle = document.createElement('object');
    bigCircle.data = ('-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/big-circle.svg');
    bigCircle.id = ('big-circle');
    title[1].after(bigCircle);
    var arrow = document.createElement('object');
    arrow.data = ('-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/db-arrow.svg');
    arrow.id = ('arrow');
    title[2].after(arrow);
    var underline = document.createElement('object');
    underline.data = ('-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/db-underline.svg');
    underline.id = ('underline');
    datePublished.after(underline);

    window.addEventListener("resize", function() {
        var dateWidth = datePublished.clientWidth;
        title[1].style.backgroundSize = "100%";
        title[2].style.backgroundSize = "100%";
        document.getElementById('underline').style.width = dateWidth + 'px';
    });

    window.addEventListener("load", function() {
        let dateWidth = datePublished.clientWidth;
        let bigCircleObj = document.getElementById('big-circle');
        console.log(bigCircleObj)
        let bigCircleObjPath = bigCircleObj.contentDocument.getElementById('big-circle-path');
        let arrowObj = document.getElementById('arrow');
        let arrowBody = arrowObj.contentDocument.getElementById('arrow-body-path');
        let arrowTip = arrowObj.contentDocument.getElementById('arrow-tip-path');
        let underlineObj = document.getElementById('underline');
        let underline = underlineObj.contentDocument.getElementById('underline-path');
        document.getElementById('underline').style.width = dateWidth + 'px';
        console.log(title);

            tl.to(title[0], .25, {backgroundSize: "100%"})
            .to(title[1], .25, {backgroundSize: "100%"})
            .to(title[2], .5, {backgroundSize: "100%"})
            .to(bigCircleObjPath, { duration: 1, strokeDashoffset:0, repeat: 0}, '-=.9')
            .to(arrowBody, { duration: .25, strokeDashoffset:0, repeat: 0})
            .to(arrowTip, { duration: .25, strokeDashoffset:0, repeat: 0})
            .to(underline, { duration: .375, strokeDashoffset:0, repeat: 0})
        
    });
}
} catch(ex) {
    console.log('error: ' + ex);
}
});