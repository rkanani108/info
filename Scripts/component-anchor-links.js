
    document.addEventListener("DOMContentLoaded", function () {
        // Handler when the DOM is fully loaded
        var anchors = $xa(".ab-anchor");
        $xa.each(anchors, function (index, value) {
            var anchor = $xa(value);
            var anchorUrl = anchor.attr("id");
            var anchorLabel = anchor.attr("data-label");
            var anchorListItem = $xa("<li class='anchor-links--list__item nav-item'></li>");
            anchorListItem.append($xa("<a href='#" + anchorUrl + "' class='nav-link'>" + anchorLabel + "</a>"));
            $xa("#anchor-links--list").append(anchorListItem);
            $xa(".anchor-links").show();
        });

        $xa(".anchor-links--list li:first-child").find("a").addClass("active");
    });