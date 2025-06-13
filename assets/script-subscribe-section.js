(function() {
    function decimalAdjust(type, value, exp) {

        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }

        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));

        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
$( document ).ready(function() {

    $('.index-products-list-block').each(function(i,elem) {

        var product_id = $(elem).data('product-id');
        var product_handle = $(elem).data('product-handle');
        var product_pack_count = $(elem).data('pack-count');
        var product_json_data = '';

        if($('#loadingSubscribeOptions_' + product_id).length > 0) {
            index_list_products.forEach(function(product_data, i2, arr) {
                if(typeof product_data[product_id] !== 'undefined') {
                    product_json_data = product_data[product_id][0];
                    if (product_json_data != '') {

                        //initActiveSubscribePlan(product_json_data, product_pack_count);

                        $('#product_block_index_' + product_json_data.id + ' .subscribe-block-input').on('click', function () {
                            //initActiveSubscribePlan(product_json_data, product_pack_count);
                        });

                        // var plan_percentage = product_json_data.selling_plan_groups[0].selling_plans[0].price_adjustments[0].value;
                        // var product_price = product_json_data.price;
                        // var product_discount_price = ((product_price / 100) * (100 - plan_percentage)) / 100;
                        //
                        // if (plan_percentage > 0) {
                        //     $('#product_block_index_' + product_json_data.id + ' .bsub-widget__plan-pricing').hide();
                        //     $('#product_block_index_' + product_json_data.id + ' .groupDiscountSummary').text(plan_percentage + '%');
                        //     $('#product_block_index_' + product_json_data.id + ' .groupPriceSummary').text('$' + Math.round10(product_discount_price, -2));
                        //
                        //     setTimeout(function() {
                        //         $('#loadingSubscribeOptions_' + product_json_data.id).hide();
                        //         $('#product_block_index_' + product_json_data.id + ' .sudscibe-options, .buttons-wrap, #price_normal_' +  product_id).fadeIn(500);
                        //     }, 100);
                        //}
                        setTimeout(function() {
                            $('#loadingSubscribeOptions_' + product_json_data.id).hide();
                            $('#product_block_index_' + product_json_data.id + ' .sudscibe-options, .buttons-wrap, #price_normal_' +  product_id).fadeIn(500);
                        }, 1000);

                    }
                }
            });
        }else{
            $('#buttons-wrap_'+ product_id +', #price_normal_' + + product_id).fadeIn(500);
        }
    });

});
function initActiveSubscribePlan(product_json_data, product_pack_count) {
    $('#product_block_index_' + product_json_data.id + ' .selling-plan-input-radio').each(function(i,elem) {

        if($(elem).is(':checked')){
            if(product_pack_count != '' && product_json_data != '') {
                var plan_percentage = product_json_data.selling_plan_groups[0].selling_plans[0].price_adjustments[0].value;
                var product_price = product_json_data.price;
                var product_price_per_pack = Math.round10((product_price/ 100)/product_pack_count, -2);
                var product_discount_price = ((product_price / 100) * (100 - plan_percentage)) / 100;
                var product_discount_price_per_pack = Math.round10(product_discount_price/product_pack_count, -2);

                if ($(elem).hasClass('one-time-subscribe')) {
                    $('#price_normal_'+product_json_data.id).text('$'+product_price_per_pack+'/can');
                }
                if ($(elem).hasClass('group-time-subscribe')) {
                    $('#price_normal_'+product_json_data.id).text('$'+product_discount_price_per_pack+'/can');
                }
            }
            $(elem).parent().parent().addClass('active');
        }else{
            $(elem).parent().parent().removeClass('active');
        }
    });
}