window.addEventListener('DOMContentLoaded', (event) => {
    $xa(".account-favorite-button").click(function () {
        var favoriteContentId = $xa(this).parent().data('fav-item')
        $xa.ajax({
            method: "POST",
            data: { contentId: favoriteContentId },
            contentId: favoriteContentId,
            url: doFavorite,
            success: function (data) {
                $xa("[data-fav-item='"+this.contentId+"']").find(".account-favorite-button").hide();
                $xa("[data-fav-item='"+this.contentId+"']").find(".account-unfavorite-button").show();
            }
        });
    });
    $xa(".account-unfavorite-button").click(function () {
        var favoriteContentId = $xa(this).parent().data('fav-item')
        $xa.ajax({
            method: "POST",
            data: { contentId: favoriteContentId },
            contentId: favoriteContentId,
            url: doUnFavorite,
            success: function (data, status, jqXHR) {
                $xa("[data-fav-item='"+this.contentId+"']").find(".account-favorite-button").show();
                $xa("[data-fav-item='"+this.contentId+"']").find(".account-unfavorite-button").hide();
            }
        });
    });
});