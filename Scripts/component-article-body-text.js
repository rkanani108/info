;(function($) {

    var config = {
        selectors: {
            body:"body",
            articleBodyText:".article-body-text",
            paragraph:"p",
            articleBodyTextCopy:".article-body-text__copy",
        }
    }

    //  util

    var trimEmptyElements = function() {
        $articleBodyTextCopy.html().trim($articleBodyTextCopy);
        $('p:empty').remove();
    }

    var addClasses = function() {
        $($articleBodyTextParagraph.get(0)).addClass('drop-cap');
        $($articleBodyTextParagraph.get(-1)).addClass('trailing-slash');
    }

    // init

    var init = function() {
        getElements();
        setUp();
    }

    var getElements = function() {
        $body = $(config.selectors.body);
        $articleBodyText = $(config.selectors.articleBodyText);
        $articleBodyTextCopy = $(config.selectors.articleBodyTextCopy, $articleBodyText);
        $articleBodyTextParagraph = $(config.selectors.paragraph, $articleBodyTextCopy);
    }

    var setUp = function() {
        trimEmptyElements();
        addClasses();
    }

    if ($('body').hasClass('on-page-editor')) {
        return;  
    } else if ($('.article-body-text')[0]){ $(document).ready(init)}
    else { return; };

})(jQuery);