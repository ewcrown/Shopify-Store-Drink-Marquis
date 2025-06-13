$( document ).ready(function() {
    loadCart();
    initCart();
    initButtonChangeQuantityOnProductPage();
});

/*$(".searchbar").on( "mouseover", function() {
      $(".search-form").show();
}).on( "mouseout", function() {
      $(".search-form").hide();
});*/

$(".search-btn").on("click",function(){
  //$("#searchForm").submit(); 
   $(".search-form").toggle();
});

$(".form-search-btn").on("click",function(){
  $("#searchForm").submit(); 
});


function loadCart() {
    jQuery.ajax({
        type: 'GET',
        url: '/cart.json',
        dataType: 'jsonp',
        success: function(data) {

            var item_count = data['item_count'];
            var total_price = data['total_price']/100;
            var cart_has_subscibe_product = 0;

            //If there are items in cart
            if ( item_count > 0 ) {

                // cart count
                jQuery('.cart-count').text(item_count);

                // mini cart data
                jQuery('.mini-cart').attr('id','mini-cart');
                jQuery('.mini-cart-subtotal').text( '$' + total_price.toFixed(2) );

                var cart_list = [];

                for( var i = 0; i < item_count; i++ ){
                    if(data['items'][i]) {
                        if (data['items'][i]['id']) {

                            var item_id = data['items'][i]['id'];
                            var product_title = data['items'][i]['title'];
                            var product_handle = data['items'][i]['handle'];
                            var quantity = data['items'][i]['quantity'];
                            var line_price = data['items'][i]['price'] / 100;
                            var product_url = data['items'][i]['url'];
                            var image_url = data['items'][i]['image'];
                            var variants = data['items'][i]['variant_options'];
                            var product_oz = Math.ceil(data['items'][i]['grams']/28.34952);
                            //var selling_plan_allocation = data['items'][i]['selling_plan_allocation'];
                            var properties = data['items'][i]['properties'];
                            var selling_plan_allocation = 0;

                            if(properties != '' && properties != null && properties != 'undefined' &&  typeof properties !== 'undefined') {
                                if(properties.subscribe == 1){
                                    selling_plan_allocation = 1;
                                }
                            }

                            var options = [];
                            for (var o = 0; o < variants.length; o++) {
                                var selected = data['items'][i]['variant_options'][o];
                                if (selected !== 'Default Title') {
                                    options.push(selected + '<br>');
                                }
                            }
                            var selected_options = options.join('');

                            var html_subscribe = '';
                            var subscribe_item = 0;
                            var min_quantity = 1;
                            if(selling_plan_allocation==1){
                                html_subscribe = '<span class="action action-subscribe"><span>Subscription</span></span>';
                                subscribe_item = 1;
                                min_quantity = 2;
                                cart_has_subscibe_product = 1;
                            }

                            var html = '<div class="item-row">\n' +
                                '                    <div class="column left-col">\n' +
                                '                        <div class="display-flex">\n' +
                                '                            <div class="image-wrap">\n' +
                                '                                <div class="image-preview">\n' +
                                '                                    <a href="' + product_url + '"><img src="' + image_url + '" /></a>\n' +
                                '                                </div>\n' +
                                '                            </div>\n' +
                                '                            <div class="content-wrap">\n' +
                                '                                <span class="title"><a href="' + product_url + '">' + product_title + '</a></span>\n' +
                                '                                <span>' + html_subscribe + '</span>\n' +
                                '                                <span class="price">$' + line_price.toFixed(2) + '</span>\n' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                    <div class="column right-col">\n' +
                                '                        <div class="meta">\n' +
                                '                            <div class="field input-wrap input-count mobile-order-1 change_product_count" data-min-quantity="' + min_quantity + '" data-properties="' + properties + '"  data-variant="' + data['items'][i]['variant_id'] + '">\n' +
                                '                                <span class="count count-minus cart-button-quantity-change icon-minus" data-productId="' + item_id + '"></span>\n' +
                                '                                <input id="product_quantity_' + data['items'][i]['variant_id']  + '" class="quantity" type="number" value="' + quantity + '">\n' +
                                '                                <span data-subscribe_item="' + subscribe_item + '" class="count count-plus cart-button-quantity-change icon-plus" data-productId="' + item_id + '"></span>\n' +
                                '                            </div>\n' +
                                '                            <span class="remove-item">\n' +
                                '                                    <a class="desktop-remove remove-item-from-cart" href="javascript:void(0)" data-productId="' + item_id + '">Remove</a>\n' +
                                '                                </span>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>';

                            cart_list.push(html);
                        } //endif
                    }
                } // endfor

                if(cart_has_subscibe_product==1){
                    $('.recharge-checkout').show();
                    $('.shopify-checkout').hide();
                }else{
                    $('.recharge-checkout').hide();
                    $('.shopify-checkout').show();
                }

                jQuery('.mini-products-list').html( cart_list.join('') );
                $('.no-items-in-cart').hide();

                jQuery('.remove-item-from-cart').on('click',function(){
                    var product_variant_id = $(this).attr('data-productId');
                    $(this).parent().parent().parent().parent().remove();
                    removeItemCountInCart(product_variant_id,0);
                });


                jQuery('.change_product_count .cart-button-quantity-change').on('click', function(){
                    $('.mini-products-list').hide();
                    $('.loadingCart').show();

                    var product_variant_id = $(this).closest('.change_product_count').attr('data-variant');
                    var current_element_quantity = parseInt($('#product_quantity_' + product_variant_id).val());
                    var current_element_properties = $(this).closest('.change_product_count').attr('data-properties');
                    var current_element_min_quantity = $(this).closest('.change_product_count').attr('data-min-quantity');

                    if($(this).hasClass('icon-plus')) {
                        var subscribe_item = $(this).data('subscribe_item');
                        //if(subscribe_item==1){
                            var new_element_quantity = current_element_quantity + 1;
                        //}else{
                          //  var new_element_quantity =  1;
                        //}

                        updateItemCountInCart(product_variant_id, new_element_quantity, current_element_properties, subscribe_item);


                        $('#product_quantity_' + product_variant_id).val(new_element_quantity);

                    }else{
                        console.log("TEST");
                        var new_element_quantity = current_element_quantity - 1;
                        console.log("new_element_quantity",new_element_quantity);
                        /*if(new_element_quantity<current_element_min_quantity){
                            new_element_quantity = current_element_min_quantity;
                        }*/
                        if(new_element_quantity>=0) {
                          
                          removeItemCountInCart(product_variant_id,new_element_quantity);

                            $('#product_quantity_' + product_variant_id).val(new_element_quantity);
                        }
                    }
                });

                $('.mini-products-list').show();
                $('.loadingCart').hide();
            }else{
                $('.loadingCart').hide();
                $('.mini-products-list').empty().show();
                $('.no-items-in-cart').show();
                $('.mini-cart-subtotall').text('$0');
            }
        }
    });
}

function initCart() {
    jQuery.ajax({
        type: 'GET',
        url: '/cart.js',
        dataType: 'json',
        success: function(data) {

            var item_counts_in_cart = data.items.length;
            var total_items_in_cart = data.item_count;

            $('#case_1_text, #case_2_text').hide();
            $('.custom-progress-bar').removeClass('case-1').removeClass('case-2').removeClass('case-3');
            if(total_items_in_cart==1){
                $('#case_1_text').show();
                $('.custom-progress-bar').addClass('case-1');
            }else if(total_items_in_cart==2){
                $('#case_2_text').show();
                $('.custom-progress-bar').addClass('case-2');
            }else if(total_items_in_cart>2){
                $('.custom-progress-bar').addClass('case-3');
            }

            if(item_counts_in_cart>0) {
                 $('#header_cart_quantity').show().text(data.items.length);
                 $('#small_cart_elements_count').text(data.items.length);
                 $('.no-items-in-cart').hide();
                 $('.recommended-items').show();
                 $('.small-cart-checkout-button').show();
            }else{
                 $('.no-items-in-cart').show();
                 $('#header_cart_quantity').text(0);
                 $('.mini-products-list').empty();
                 $('#small_cart_elements_count').text(0);
                 $('.mini-cart-subtotal').text('$0');
                 $('.recommended-items').hide();
                 $('.small-cart-checkout-button').hide();
            }
        }
    });
}

function initButtonChangeQuantityOnProductPage() {
    $('.icon-minus').addClass('no-active');

    $('.button-quantity-change').on('click', function(){

        var product_id = $(this).data('product_id');
        var selected_qty = parseInt($('#product_selected_quantity_' + product_id).val());
        var max_qty = parseInt($('#product_max_quantity_' + product_id).val());
        var min_qty = $('#product_min_quantity_' + product_id).val();

        var new_qty = selected_qty;

        if($(this).hasClass('icon-plus')) {
            if(max_qty>selected_qty) {
                new_qty++;
            }
        }else{
            if(new_qty>1) {
                new_qty--;
            }else{
              console.log("TEST");
            }
        }
        new_qty = (isNaN(new_qty))?1:new_qty;

        if(new_qty<min_qty){
            new_qty = min_qty;
        }

        if(new_qty==min_qty){
            $('.icon-minus').addClass('no-active');
        }else{
            $('.icon-minus').removeClass('no-active');
        }

        $('#product_selected_quantity_' + product_id).val(new_qty);

        if(max_qty==new_qty) {
            $('.icon-plus').hide();
        }else{
            $('.icon-plus').show();
        }
    });
}

function removeItemCountInCart(variant_id,new_count) {
    var data = {
        'id': variant_id,
        'quantity': new_count
    }
    jQuery.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: data,
        dataType: 'json',
        success: function(data) {
            initCart();
            loadCart();
        },
        error: function(error) {
            alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
            initCart();
            loadCart();
        }

    });
}

function updateItemCountInCart(variant_id,new_count, properties, subscribe_item) {

    // console.log(properties);
    // if(properties!='' && subscribe_item == 0) {
    //     var data = {
    //         "id": variant_id,
    //         "quantity": new_count,
    //         "properties": { properties }
    //     }
    // }else{
        var data = {
            "id": variant_id,
            "quantity": new_count
        }

    //}
    //console.log(data);
    //if(subscribe_item == 1) {
        jQuery.ajax({
            type: 'POST',
            url: '/cart/change.js',
            data: data,
            dataType: 'json',
            success: function(data) {
                initCart();
                loadCart();
            },
            error: function(error) {
                alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
                initCart();
                loadCart();
            }
        });
}

function showSmallCart(){
    $('.cart-action').click();
}

jQuery(document).ready(function($){
  var $pform = $('.product-card form');
  if(!$pform.length){ return; }
  $pform.submit(function(e){
    $form = $(this);
    e.preventDefault();
    var data = {
        "id": $form.find('[name="id"]').val(),
        "quantity": 1
    }
    
    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function (e) {
            initCart();
            loadCart();
            showSmallCart();
        },error:function(error){
            alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
        }
    });
  });
});

function addItemToCartRecharge(product_id) {
    var qty = parseInt($('.product_selected_quantity').val());
    var order_type = '';

    $('#product_form_' + product_id + ' input[name="purchase_type"]').each(function(i,elem) {
        if($(elem).is(":checked")){
            order_type = $(elem).val();
        }
    });

    console.log(order_type);
  
     if(order_type=='onetime') {
         var variant_id = $('#selected_or_first_available_variant_' + product_id).val();
     }else{
         var variant_id = $('#subscribe_variant_id_' + product_id).val();
     }

    console.log(qty);
  console.log(variant_id);

    if(qty>0 && variant_id) {

        if (order_type == 'onetime') {
            data = {
                "id": variant_id,
                "quantity": qty
            }
        } else {

            var shipping_interval_frequency = $('select.rc_select__frequency').val();
            if(shipping_interval_frequency>0){
                shipping_interval_frequency = shipping_interval_frequency;
            }else{
                shipping_interval_frequency = 14;
            }

            data = {
                "id": variant_id,
                "quantity": qty,
                "properties": {
                    "subscribe": 1,
                    "shipping_interval_unit_type": "days",
                    "shipping_interval_frequency": shipping_interval_frequency
                }
            }
        }



        jQuery.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: data,
            dataType: 'json',
            success: function (e) {
                initCart();
                loadCart();
                showSmallCart();
            },error:function(error){
                alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
            }
        });
    }else{
        alert('Error. Can\'t add this product to cart!')
    }

}

function addItemToCart() {

    var qty = parseInt($('#product_selected_quantity').val());

    var variant_id = $('#selected_or_first_available_variant').val();
    var properties = $('#product_extra_properties').val();
    if(!qty){
        qty = 1;
    }
    if(properties!='') {
        var data = {
            "id": variant_id,
            "quantity": qty,
            "properties": { properties }
        }
    }else{
        var data = {
            "id": variant_id,
            "quantity": qty
        }
    }
    jQuery.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function() {
            initCart();
            loadCart();
            showSmallCart();
        },
        error: function(error) {
            alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
        }
    });
}

function addSubscribeItemToCart(variant_id, product_id) {

    if(product_id>0){
        var qty = parseInt($('#product_block_index_' + product_id + ' .product_selected_quantity').val());
        var properties = $('#product_block_index_' + product_id + ' .product_extra_properties').val();
        var selling_plan = $('#product_block_index_' + product_id + ' input[name="selling_plan"]').val();
        var min_quantity = $('#product_min_quantity_' + product_id).val();
    }else {
        var qty = parseInt($('#product_selected_quantity').val());
        var properties = $('.product_extra_properties').val();
        var selling_plan = $('input[name="selling_plan"]').val();
        var min_quantity = $('.product_min_quantity').val();
    }

    if(!qty){
        qty = 1;
    }

    if(qty<min_quantity){
        qty = min_quantity;
    }

    setTimeout(function() {
        if(properties!='') {
            var data = {
                "id": variant_id,
                "quantity": qty,
                "selling_plan": selling_plan,
                "properties": { properties }
            }
        }else{
            var data = {
                "id": variant_id,
                "quantity": qty,
                "selling_plan": selling_plan
            }
        }

        jQuery.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: data,
            dataType: 'json',
            success: function () {
                initCart();
                loadCart();
                showSmallCart();
            },
            error: function(error) {
                alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
            }
        });
    }, 100);

}

function quiqAddItemToCart(variant_id, properties) {

    var qty = parseInt($('#product_selected_quantity').val());
    if(!qty){
        qty = 1;
    }
    if(properties!='') {
        var data = {
            "id": variant_id,
            "quantity": qty,
            "properties": { properties }
        }
    }else{
        var data = {
            "id": variant_id,
            "quantity": qty
        }
    }
    jQuery.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function() {
            initCart();
            loadCart();
            showSmallCart();
        },
        error: function(error) {
            alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
        }
    });
}

function addItemToCart2(itemid) {

    var qty = 1;

    var variant_id = $('#selected_or_first_available_variant').val();
    var properties = $('#product_extra_properties').val();
   
    var data = {
      "id": itemid,
      "quantity": qty
    }
    jQuery.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function() {
            initCart();
            loadCart();
            showSmallCart();
        },
        error: function(error) {
            alert(error.responseJSON.message + '\r\n' + error.responseJSON.description);
        }
    });
}

