window.addEventListener('DOMContentLoaded', (event) => {
    $xa(".favorite-button").click(function () {
    $xa.ajax({
        method: "POST",
        data: { contentId: favoriteContentId},
        url: doFavorite,
        success: function (data) {
            $xa(".favorite-button").hide();
            $xa(".unfavorite-button").show();
        }
    });
});
    $xa(".unfavorite-button").click(function () {
    $xa.ajax({
        method: "POST",
        data: { contentId: favoriteContentId},
        url: doUnFavorite,
        success: function (data) {
            $xa(".favorite-button").show();
            $xa(".unfavorite-button").hide();
        }
    });
});
});