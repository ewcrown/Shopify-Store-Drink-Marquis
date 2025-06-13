function openRecipe(element){
    $('.navigation_cocktail').removeClass('active');
    $('.cocktail-recipe').hide();
    $('#navigation_' + element).addClass('active');
    $('#' + element).show();
}
function filterCocktail(){
    setTimeout(
        function() {
            var counter = 0
            var selected_flavor_value = $('.select-flavor .current').text();
            var selected_liquor_value = $('.select-liquor .current').text();
            var active_elements = 0;

            $('.cocktail-recipe, #no_filter_results').hide();
            $('.navigation_cocktail').hide().each(function(i,elem) {
                var recipe = $(elem).data('recipe');
                var elem_flavor_value = $(elem).data('flavor-filter');
                var elem_liquor_value = $(elem).data('liquor-filter');
                var display_element = 0;

                if (selected_flavor_value != 'All' && selected_liquor_value == 'All') {
                    if(elem_flavor_value==selected_flavor_value){
                        display_element = 1
                    }
                }
                if (selected_flavor_value == 'All' && selected_liquor_value != 'All') {
                    if(elem_liquor_value==selected_liquor_value){
                        display_element = 1
                    }
                }
                if (selected_flavor_value != 'All' && selected_liquor_value != 'All') {
                    if(elem_liquor_value==selected_liquor_value && elem_flavor_value==selected_flavor_value){
                        display_element = 1
                    }
                }
                if (selected_flavor_value == 'All' && selected_liquor_value == 'All') {
                    display_element = 1
                }
                if(display_element==1){
                    active_elements ++;
                    $(elem).show();
                    openRecipe(recipe);
                }
            });

            if(active_elements==0){
                $('#no_filter_results').show();
            }


        }, 100
    );
    $('.navigation_cocktail').each(function(i,elem) {



       /*
        var flavor_value = $(elem).data('flavor-filter');
        var liquor_value = $(elem).data('liquor-filter');
        var already_filtered = $(elem).data('already-filtered');
        var recipe = $(elem).data('recipe');



        if(type == 'flavor') {
            if(flavor_value == value){
                if(already_filtered!='liquor') {
                    $(elem).show();
                    if (counter == 0) {
                        openRecipe(recipe);
                    }
                    counter++;
                }
            }else{
                $(elem).hide();
                $(elem).data('already-filtered','flavor');
            }
        }
        if(type == 'liquor') {
            if(liquor_value == value){
                if(already_filtered!='flavor') {
                    $(elem).show();
                    if (counter == 0) {
                        openRecipe(recipe);
                    }
                    counter++;
                }
            }else{
                $(elem).hide();
                $(elem).data('already-filtered','liquor');
            }
        }

        */
    });
}
