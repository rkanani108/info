window.addEventListener('DOMContentLoaded', (event) => {

    var totalExpertCard = $xa(".expert-cards__item-wrapper .expert-cards__item").length;

    if(totalExpertCard > 4) {
        if(totalExpertCard % 3 == 1) {
            $xa(".expert-cards__item-wrapper").addClass("repeat-even-column");
        } else {
            if(totalExpertCard % 4 == 0){
                $xa(".expert-cards__item-wrapper").addClass("repeat-even-column");
            } else {
                $xa(".expert-cards__item-wrapper").addClass("repeat-odd-column");
            }
        }
    }
});