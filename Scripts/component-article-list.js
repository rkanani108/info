document.addEventListener("DOMContentLoaded", function () {
    try {
    //Don't run this in edit mode.
    if($xa('body').hasClass('on-page-editor')) return;  

var articleListItemsNums = document.querySelectorAll('.article-list-item--number');
var articleListItems = document.querySelectorAll('.article-list-item');

if (articleListItems.length) {
articleListItems[0].classList.add('inverse');

for (let i = 0; i < articleListItemsNums.length; i++) {
    if (i >= 9) {
        articleListItemsNums[i].insertAdjacentHTML('beforeend', (i+1));
    } else {
        articleListItemsNums[i].insertAdjacentHTML('beforeend', ('0' + (i+1)));
    }
}


var whiteScribble = document.createElement('object');
whiteScribble.data = ('-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/scribble-1-white.svg');
whiteScribble.id = ('white-scribble');
whiteScribble.className = ('scribble');
articleListItemsNums[0].after(whiteScribble);


for (let i = 1; i < articleListItemsNums.length; i++) {
    let scribble1 = document.createElement('object');
    scribble1.data = ('-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/scribble-1.svg');
    scribble1.className = ('scribble-1 scribble');
    let scribble2 = document.createElement('object');
    scribble2.data = ('-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/scribble-2.svg');
    scribble2.className = ('scribble-2 scribble');
    let scribble3 = document.createElement('object');
    scribble3.data = ('-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/scribble-3.svg');
    scribble3.className = ('scribble-3 scribble');
    if (i % 3 == 0) {
        articleListItemsNums[i].after(scribble1);
    } else if (i % 3 == 1) {
        articleListItemsNums[i].after(scribble2);
    } else {
        articleListItemsNums[i].after(scribble3);
    }
}

window.addEventListener("resize", function() {

    let svgScribbles = document.getElementsByClassName('scribble');

    for (let i = 0; i < svgScribbles.length; i++) {
        if(window.innerWidth > 991) {
            svgScribbles[i].style.display = 'block';
        } else {
            svgScribbles[i].style.display = 'none';
        }
    }
})

window.addEventListener("DOMContentLoaded", function() {
    svgElements();

    // var elPos = articleListItems[0].getBoundingClientRect().top;
    // var elH = articleListItems[0].clientHeight;
    // var diff = ((elH - Math.abs(elPos)));
    // console.log(diff)

    // for(let i = 0; i < articleListItems.length; i++) {
    // articleListItems[i].style.marginBottom = (diff - 360) + 'px';
    // }
});

// window.addEventListener('scroll', function() {
//     var elPos = articleListItems[0].getBoundingClientRect().top;
//     var elH = articleListItems[0].clientHeight;
//     var diff = ((elH - Math.abs(elPos)));
//     console.log(diff)
    
//     for(let i = 0; i < articleListItems.length; i++) {
//         if((diff - 361) > 36) {
//             articleListItems[i].style.marginBottom = (diff - 360) + 'px';
//             // console.log(articleListItems[i].style.marginBottom)
//         } else {
//             articleListItems[i].style.marginBottom = '20px';
//         }
//     }
// })


let svgElements = function() {

    if(window.innerWidth > 991) {

        let tl = gsap.timeline();

        articleListItems.forEach.call(articleListItems, function(el) {
            el.addEventListener('mouseenter', function(e) {
                let a = el.querySelector('.article-list-item--number').nextElementSibling;
                let svgEl = a.contentDocument.getElementsByTagName('path');
                      tl.to(svgEl[1], { duration: .5, strokeDashoffset:0, repeat: 0})
            })
        })

        articleListItems.forEach.call(articleListItems, function(el) {
            el.addEventListener('mouseleave', function(e) {
                let a = el.querySelector('.article-list-item--number').nextElementSibling;
                let svgEl = a.contentDocument.getElementsByTagName('path');
                      tl.to(svgEl[1], { duration: .5, strokeDashoffset:-1000, repeat: 0})
            })
        })
    }
}
}
    
} catch(ex) {
    console.log('error: ' + ex);
}
});