document.addEventListener("DOMContentLoaded", function () {
    try {
    //Don't run this in edit mode.
    if($xa('body').hasClass('on-page-editor')) return;

    var tl = gsap.timeline();

    if(document.querySelector('#spot-light-article-circle')){
    var spotLightSVG = document.querySelector('#spot-light-article-circle');
    }

    if(document.querySelector('.headline')){
    var headlineWidth = document.querySelector('.headline').clientWidth;
    }

    if(headlineWidth) {
    window.onload = elemAni;
    }

    function elemAni() {
        tl.to("#spot-light-article-circle", {width: headlineWidth * 1.25, left: -headlineWidth / 8, top: -headlineWidth / 8})
        .to("#spot-light-article-circle *", { duration: 1, strokeDashoffset:0 })
    }
} catch(ex) {
    console.log('error: ' + ex);
}
});