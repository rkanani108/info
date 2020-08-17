document.addEventListener("DOMContentLoaded", function () {
    // Print All Button Click Function
    $xa(".printAll__Wrapper-content").on("click",function(){
        if($xa(".print-article-content")){
            $xa(".print-article-content").empty();
        }
        // Add Loader Div
        $xa(".db-article-list").after("<div class='loader'><div class='spinner'><div class='spinner__circle'><div class='spinner__circle-gradient'></div><div class='spinner__circle-inner'></div></div></div><img src='-/media/Themes/AdvisoryBoard/Advisory/Advisory/images/ab-logo-loader.png' alt='AB' /></div>"); 
        $xa('.loader').show();
        $xa('.db-article-list').addClass('print-db-content');

        var count = $xa(".db-article-list .article-list-item").length;
        $xa(".db-article-list .article-list-item").each(function(i){
            var _this = $xa(this); 
            var itemUrl = _this.find(".article-list-item--body a").attr("href");
            $xa.ajax({
                url: itemUrl,
                type: 'GET',
                success: function(res) {
                    var data = $xa.parseHTML(res);
                    $xa(data).find('main').each(function(){
                        _this.after("<div class='print-article-content'></div>");
                        _this.next(".print-article-content").append($xa(this).html());
                    });
                }
            });

            if (i+1 === count) {
                $xa(document).ajaxStop(function() {
                    $xa('.loader').hide();
                    window.print();
                    $xa(".print-article-content").empty();
                    $xa('.db-article-list').removeClass('print-db-content');
                    $xa(document).unbind("ajaxStop");
                    return false;
                });
            }

        });
    });
});