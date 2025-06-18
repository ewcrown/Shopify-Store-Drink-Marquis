jQuery(document).ready(function($){

  var scrollTop = (function(){

    $('.scroll-to-top').click(function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
  }());

  var leadForm = (function(){

    var $form = $('.lead-cap-form');

    if( !$form.length ){ return; }

    $form.on('submit', 'form',(function(e){
      
      e.preventDefault();

      var email = $form.find('#email').val();
      var phone = $form.find('#tel').val();
      
      var settings = {
        "url": "https://manage.kmail-lists.com/ajax/subscriptions/subscribe",
        "method": "POST",
        "data": {
          "g": "WwRLJb", // replace LIST_ID with id of list to be subscribed
          "email": email,
          // pass in additional fields, each additional field
          // must be included in the $fields string separated by commas
          "$fields": "$source, $phone_number",
          "$source": "Website Lead Capture Form",
          "$phone_number": phone,
          // "$first_name": firstname,
          // "$last_name": lastname
        }
      };
      
      $.ajax(settings).done(function(response) {
        if( response.success ){
          $form.find('form').remove();
          $form.html('<div class="success-msg"><p>Your message has been sent successfully.</p><p><a href="/pages/lead-capture">Back to Promotions Request</a></p</div>');
        }
      });
      
    }));
    
  }());

  $(".has-child").click(function() {
      var submenu = $(this).children('.sub-menu');
      if(submenu.hasClass('showmenu')) {
          submenu.removeClass('showmenu')
      } else {
          submenu.addClass('showmenu');
      }
      
  });
  
  
  	$('.rtl-slider').slick({
  	  slidesToShow: 1,
  	  slidesToScroll: 1,
  	  arrows: false,
  	  fade: true,
  	  asNavFor: '.rtl-slider-nav'
  	});
  	$('.rtl-slider-nav').slick({
  		slidesToShow: 2,
  		slidesToScroll: 1,
  		vertical: true,
  	   asNavFor: '.rtl-slider',
  	   centerMode: false,
  	   focusOnSelect: true,
  		prevArrow: ".thumb-prev",
     	nextArrow: ".thumb-next",
  	});
    $('#rc_radio_options').on('change', function() { 
      console.log($("#rc_container > input[type=hidden]").attr('name'))
      if($("#rc_container > input[type=hidden]").attr('name') == "properties[shipping_interval_unit_type]") {
        $(".checkbox-wrap-list, .price-custom, .subs-adj").addClass('active-subs');
        var priceCan =  $("#rc_price_autodeliver").text(),
           priceCanned = priceCan.replace('$',''),
           priceCanned1 = priceCanned / 12;
          
        // $(".subscribe-save").show(); 
        setTimeout(function() { 
          // $(".subscribe-wrap .price").text('$' + priceCanned1.toFixed(2) + "/can");
          $(".subscribe-wrap .price").text('SAVE 10%');
        }, 100);
      } else {
        $(".checkbox-wrap-list, .price-custom, .subs-adj").removeClass('active-subs');
        // $(".subscribe-save").hide(); 
        var priceCan =  $("#rc_price_onetime").text(),
           priceCanned = priceCan.replace('$',''),
           priceCanned1 = priceCanned / 12;
        setTimeout(function() { 
          $(".subscribe-wrap .price").text('$' + priceCanned1.toFixed(3).slice(0,-1) + "/can");
          // $(".subscribe-wrap .price").text('SAVE 10%');
        }, 100);
      }
     
    });
});

(function($){

    jQuery(document).ready(function(){
        if(jQuery('.lead-capture-page-wrap .success-msg').length > 0 ){
            jQuery('.lead-capture-page-wrap  .image-wrap').css('display', 'none');
        }
        if(jQuery('.home-page-wrap').length > 0 ){
            homePageSliders();
            canvasAnimation();
            // sliderBackgroundOpacity();
            sliderBackgroundRGB();
            transformSliderImage();
        }
        if(jQuery('.review-slider').length > 0){
            reviewSlider();
        }
        if(jQuery('.product-page').length > 0 ){
            headerSticky();
            mobileGallary();
            canvasAnimation();
            productDetailsPopup();
        }
        if(jQuery('.merchandise-pdp-page').length > 0 ){
            mobileGallary();
        }
        if(jQuery('.subscription-page').length > 0 ){
            canvasAnimation();
        }
        jQuery(document).on('click', function(event){
            if( jQuery(event.target).hasClass('current') ){
                return;
            }
            jQuery('.select-field').removeClass('active');
        });

        if(jQuery('.contact-us-wholesale-page').length > 0 ){
            countrySelect();
        }

        if(jQuery('#ReCharge').length > 0 ){
            jQuery('footer .walve-footer').addClass('white');
        }
        if(jQuery('#recharge-te').length > 0 ){
            jQuery('footer .walve-footer').addClass('white');
        }
    });

    jQuery('.modal__overlay').click(function(e){

        if( jQuery('#cart').hasClass('active') ){
            jQuery('#cart').removeClass('active');
        }
        if( jQuery('.login-section').hasClass('active') ){
            closeLoginForm();
        }

        modalOverlayActive('hide');
    });

    selectProduct();
    navigationSelect();
    headerNavigationSlider();
    selectDelivery();
    faqActive();
    blogSlider();
    mainNavigationHover();
    cartActive();
    marqueeLine();
    mobileNavigation();
    selectCocktail();

    function headerNavigationSlider () {
        var navigationSlider = jQuery('.navigation-slider');

        navigationSlider.owlCarousel({
            items: 5,
            margin: 40,
            loop: false,
            dots: false,
            nav: true,
            navText: ["" +
            "<span class='slide-nav prev-slide'><svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<g opacity=\"0.3\">\n" +
            "<path d=\"M25.0001 45.8332C36.506 45.8332 45.8334 36.5058 45.8334 24.9998C45.8334 13.4939 36.506 4.1665 25.0001 4.1665C13.4941 4.1665 4.16675 13.4939 4.16675 24.9998C4.16675 36.5058 13.4941 45.8332 25.0001 45.8332Z\" stroke=\"#BFBFBF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
            "<path d=\"M25.0001 16.6665L16.6667 24.9998L25.0001 33.3332\" stroke=\"#BFBFBF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
            "<path d=\"M33.3334 25H16.6667\" stroke=\"#BFBFBF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
            "</g>\n" +
            "</svg>\n</span>",
                "<span class='slide-nav next-slide'><svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "<g opacity=\"0.3\">\n" +
                "<path d=\"M25.0001 45.8332C36.506 45.8332 45.8334 36.5058 45.8334 24.9998C45.8334 13.4939 36.506 4.1665 25.0001 4.1665C13.4941 4.1665 4.16675 13.4939 4.16675 24.9998C4.16675 36.5058 13.4941 45.8332 25.0001 45.8332Z\" stroke=\"#BFBFBF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
                "<path d=\"M25.0001 16.6665L16.6667 24.9998L25.0001 33.3332\" stroke=\"#BFBFBF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
                "<path d=\"M33.3334 25H16.6667\" stroke=\"#BFBFBF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
                "</g>\n" +
                "</svg>\n</span>"],
            responsive: {
                570: {
                    items: 2,
                },
                1200: {
                    items: 4,
                },
                1400: {
                    items: 5,
                }
            }
        });
    }


 function homePageSliders() {
  var productsSlider = jQuery('.products-slider');

  productsSlider.owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: true,
    navText: [
      "<span class='slide-nav prev-slide'></span>",
      "<span class='slide-nav next-slide'></span>"
    ],
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    paginationSpeed: 1000,
    mouseDrag: false
  });

  var $dots = jQuery('.dots-nav__option');

  $dots.on('click', function () {
    var $this = jQuery(this);
    var index = $this.data('index');

    $dots.removeClass('active');
    $this.addClass('active');

    productsSlider.trigger('to.owl.carousel', [index, 300]);
  });

  productsSlider.on('changed.owl.carousel', function (event) {
    var currentSlide = jQuery('.products-slider .owl-item').eq(event.item.index);
    var currentSlideItem = currentSlide.find('.slide-item');
    var slideCurrenBg = currentSlideItem.attr('current-bg-color');

    if (slideCurrenBg) {
      jQuery('.slider-bg-wrap').css({
        backgroundColor: 'rgb(' + slideCurrenBg + ')'
      });
    }

    var activeIndex = currentSlideItem.data('index');
    $dots.removeClass('active');
    $dots.filter('[data-index="' + activeIndex + '"]').addClass('active');
  });

  // Press Slider
  var pressSlider = jQuery('.press-slider');
  pressSlider.owlCarousel({
    items: 1,
    loop: false,
    dots: false,
    nav: true,
    margin: 20,
    navText: [
      "<span class='slide-nav prev-slide'></span>",
      "<span class='slide-nav next-slide'></span>"
    ],
    responsive: {
      768: {
        margin: 47,
        items: 3
      },
      1200: {
        margin: 47,
        items: 3
      }
    }
  });

  // What Caffeine Slider
  var whatCaffeine = jQuery('.what-caffeine-slider');
  whatCaffeine.owlCarousel({
    items: 1,
    loop: true,
    center: true,
    dots: false,
    nav: false,
    margin: -18,
    stagePadding: 45,
    responsive: {
      424: {
        stagePadding: 89
      }
    },
    onResized: function () {
      var widthSlide = jQuery('.item-wrap', whatCaffeine).width();
      jQuery('.header', whatCaffeine).height(widthSlide);
    }
  });
}
    function selectProduct(){
        jQuery('.select-product .current').on('click', function(){
            // if( jQuery(this).parent().hasClass('active') ){
            // } else {
            //  jQuery(this).parent().addClass('active');
            // }
            jQuery(this).parent().toggleClass('active');
        });

        jQuery('.select-product li').on('click', function(){
            var value = jQuery(this).text();
            jQuery('.select-product .current').text(value);
            jQuery('.select-product').removeClass('active');
        });

        jQuery(document).on('click', function(event){

            if( jQuery(event.target).hasClass('current') ){
                return;
            }

            jQuery('.select-product').removeClass('active');

        });
    }

    function navigationSelect(){
        jQuery('.navigation-select .current').on('click', function(){
            jQuery(this).parent().toggleClass('active');
        });

        jQuery('.navigation-select li').on('click', function(){
            var value = jQuery(this).text();
            jQuery('.navigation-select .current').text(value);
            jQuery('.navigation-select').toggleClass('active');
        })
    }

    function selectDelivery(){

        jQuery('.select-delivery .current').on('click', function(){
            jQuery(this).parent().toggleClass('active');
        });

        jQuery('.select-delivery li').on('click', function(){
            var value = jQuery(this).text();
            jQuery('.select-delivery .current').text(value);
            jQuery('.select-delivery').toggleClass('active');
        })
    }

    function selectCocktail(){

        jQuery('.select-flavor .current').on('click', function(){
            jQuery(this).parent().toggleClass('active');
        });
        jQuery('.select-flavor li').on('click', function(){
            var value = jQuery(this).text();
            jQuery('.select-flavor .current').text(value);
            jQuery('.select-flavor').toggleClass('active');
        });


        jQuery('.select-liquor .current').on('click', function(){
            jQuery(this).parent().toggleClass('active');
        });
        jQuery('.select-liquor li').on('click', function(){
            var value = jQuery(this).text();
            jQuery('.select-liquor .current').text(value);
            jQuery('.select-liquor').toggleClass('active');
        })
    }

    function reviewSlider(){
        var reviewSlider = jQuery('.review-slider');

        reviewSlider.owlCarousel({
            items: 1,
            loop: true,
            dots: false,
            nav: true,
            margin: 15,
            navText: ["<span class='slide-nav prev-slide'></span>","<span class='slide-nav next-slide'></span>"],
            responsive: {
                768:{
                    items: 2,
                },
                1200: {
                    margin: 33,
                    items: 3,
                }
            }
        });
    }

    function faqActive(){
        jQuery('.faq-wrap .question').on('click',function(){
            var id = jQuery(this).data('question-id');

            jQuery(this).parent().toggleClass('active');

            if( jQuery(this).hasClass('show') ){
                jQuery('[data-answer-id='+ id +']').slideUp();
            } else {
                jQuery('[data-answer-id='+ id +']').slideDown();
            }
            jQuery(this).toggleClass('show');
        });

        jQuery('.faq-page-wrap .faq-tab').on('click', function(e){
            e.preventDefault();
            var faqSection = jQuery('a', this).data('faq-section');

            showFAQs(faqSection);

            jQuery(this).addClass('active');
        });

        jQuery(document).ready(function(){
            if(window.location.hash != ''){
                var faqSection = window.location.hash.substring(1, window.location.hash.length);

                showFAQs(faqSection);

                jQuery('a[data-faq-section='+ faqSection +']').parent().addClass('active');
            }
        });
    }

    function showFAQs(faqSection){
        jQuery('.faq-tab').removeClass('active');

        if(faqSection == 'all'){
            jQuery('.faq-item').slideDown();
        } else {
            jQuery('.faq-item').each(function(index, el){
                if( jQuery(el).data('faq-section') != faqSection){
                    jQuery(el).slideUp();
                } else {
                    jQuery(el).slideDown();
                }
            });
        }
    }

    function headerSticky(){
        var topBarHeight = jQuery('.top-bar').height();
        jQuery(document).scroll(function(){

            if( (jQuery(document).scrollTop() > topBarHeight) ){
                jQuery('header').addClass('sticky');
            }

            if( jQuery(document).scrollTop() < topBarHeight ){
                jQuery('header').removeClass('sticky');
            }
        });
    }

    function blogSlider(){
        var recentlyPosts = jQuery('.recently-posts-slider');
        if( recentlyPosts.length > 0 ){
            recentlyPosts.owlCarousel({
                items: 3,
                loop: true,
                dots: false,
                nav: true,
                margin: 47,
                navText: ["<span class='slide-nav prev-slide'></span>","<span class='slide-nav next-slide'></span>"],
            });
        }

        var mobileSlider = jQuery('.mobile-posts-slider');
        if( mobileSlider.length > 0 ){
            mobileSlider.owlCarousel({
                items: 1,
                loop: false,
                dots: false,
                nav: true,
                margin: 15,
                navText: ["<span class='slide-nav prev-slide'></span>","<span class='slide-nav next-slide'></span>"],
            });
        }

    }

    function mainNavigationHover(){
        var mainLogo = jQuery(".main-logo");
        var whiteLogoSrc = mainLogo.data('white-logo');
        var greenLogoSrc = mainLogo.data('green-logo');

        jQuery(document).on('mouseenter', '.main-navigation .has-children', function(){
            jQuery('.main-navigation').addClass('nav-bar-hover');
            mainLogo.attr('src', greenLogoSrc);
        });

        jQuery(document).on('mouseleave', '.main-navigation .has-children', function(){
            jQuery('.main-navigation').removeClass('nav-bar-hover');
            if( jQuery('.main-navigation').hasClass('white-navigation') ){
                mainLogo.attr('src', whiteLogoSrc);
            }
        });

    }

    function cartActive(){
        jQuery('.cart-action').on('click', function(e){
            e.preventDefault();
            modalOverlayActive('show');
            jQuery('#cart').addClass('active');
        });

        jQuery('.close-cart').on('click', function(e){
            modalOverlayActive('hide');
            jQuery('#cart').removeClass('active');
        });
    }

    function modalOverlayActive( status ){
        var modalOverlay = jQuery('.modal__overlay');

        if( status == 'show' ){
            modalOverlay.addClass('active');
            jQuery('body').addClass('fixed');
                modalOverlay.animate({
                    opacity: 1,
                }, 400);
        }

        if( status == 'hide' ){
            modalOverlay.animate({
                opacity: 0,
            }, {
                duration: 400,
                easing: "linear",
                complete: function(){
                    jQuery('body').removeClass('fixed');
                    modalOverlay.removeClass('active');
                }
            });
        }
    }

    loginForm();
    jQuery(window).resize(function(){
        if(jQuery('#login-container').hasClass('active') && jQuery('.main-wrap').hasClass('position-relative') && jQuery(window).height() > 510 ){
            jQuery('.main-wrap').removeClass('position-relative');
        }

        if(jQuery('#login-container').hasClass('active') && jQuery(window).height() < 510 ){
            jQuery('.main-wrap').addClass('position-relative');
        }
    });

    function closeLoginForm(){
        jQuery('.login-form').removeClass('active');
        jQuery('#login-container .form-wrap').animate({
            opacity: 0,
        }, {
            duration: 200,
            easing: "linear",
            complete: function(){
                jQuery('.main-wrap').toggleClass('fixed');
                jQuery('#login-container').toggleClass('active');

                // if( jQuery('.recover-password-form').hasClass('active') ) {
                //     jQuery('.recover-password-form').removeClass('active');
                // }

                if( jQuery('.login-register-forms').hasClass('hide') ){
                    jQuery('.login-register-forms').removeClass('hide');
                }

                jQuery('.login-register-forms .tab-content').removeClass('active');
                jQuery('.login-register-forms .tab-name').removeClass('active');
                jQuery('[data-form-name=login]').addClass('active');
                jQuery('[data-form-tab=login]').addClass('active');
            }
        });
    }


    function loginForm(){
        jQuery('.login-form').on('click', function(e){
            e.preventDefault();
            modalOverlayActive('show');
            if( jQuery(window).height() < 510 ){
                jQuery('.main-wrap').addClass('position-relative');
            }

            jQuery('.main-wrap').toggleClass('fixed');

            jQuery('.login-section').addClass('active');

            setTimeout(function(){
                jQuery('#login-container .form-wrap').animate({
                    opacity: 1,
                }, 200);
            }, 800);
        });



        jQuery(document).on('click', '.close-login-form, .close-mob-login-form', function(){
            closeLoginForm();
            modalOverlayActive('hide');
        });

        jQuery('.login-register-forms [data-form-name]').on('click', function(){
            var formName = jQuery(this).data('form-name');
            if( jQuery('[data-form-tab='+ formName +']').hasClass('active') ){
                return;
            }

            jQuery('.login-register-forms .tab-name').removeClass('active');
            jQuery('.login-register-forms .tab-content').removeClass('active');
            jQuery('[data-form-tab='+ formName +']').addClass('active');
            jQuery('[data-form-name='+ formName +']').addClass('active');
        });
   }

   function marqueeLine(){
    $(function() {
      // $('.marquee .marquee__inner').marquee({
      //   duration: 40000,
      //   startVisible: true,
      //   duplicated: true
      // });
    });
  }

  function mobileNavigation(){
      jQuery('.burger-btn').on('click', function(e){
        e.preventDefault();
        jQuery('.logo-wrap').toggleClass('hide');
        jQuery(this).toggleClass('open-menu');
        jQuery('.mobile-navigation').toggleClass('active');
        jQuery('.nav-bar').toggleClass('fixed');
        jQuery('body').toggleClass('fixed');
      });

      jQuery('.mobile-navigation li.has-child').on('click', function(){
        jQuery('.mobile-navigation li').removeClass('active');
        jQuery(this).addClass('active');
      });
  }

  function mobileGallary(){
    var mobileGallary = jQuery('.mobile-gallary');

    mobileGallary.owlCarousel({
        items: 1,
        loop: false,
        dots: true,
        nav: false,
    });
  }

  function canvasAnimation(){
    const app = new PIXI.Application({
        backgroundColor : 0x000000,
        backgroundAlpha : 0,
        width: jQuery(document).width(),
        height: jQuery(window).height() + 100});

var canvasWrap = jQuery('.canvas-wrap');
    canvasWrap.append(app.view);
var imageUrl = jQuery('.canvas-wrap').data('bubble-img');

// holder to store the aliens
const aliens = [];

const totalDudes = 10;

for (let i = 0; i < totalDudes; i++) {
    // create a new Sprite that uses the image name that we just generated as its source
    // const dude = PIXI.Sprite.from('img.png');
    const dude = PIXI.Sprite.from(imageUrl);

    // set the anchor point so the texture is centered on the sprite
    dude.anchor.set(0.5);

    // set a random scale for the dude - no point them all being the same size!
    dude.scale.set(Math.random() + 0.3);

    // finally lets set the dude to be at a random position..
   // dude.x = Math.random() * app.screen.width;
   // dude.y = Math.random() * app.screen.height;

    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;

    //dude.tint = Math.random() * 0xFFFFFF;
    //dude.tint = 0xFFFFFF;

    // create some extra properties that will control movement :
    // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
    dude.direction = Math.random() * Math.PI * 2;

     // this number will be used to modify the direction of the dude over time
    dude.turningSpeed = Math.random() - 0.8;

    // create a random speed for the dude between 2 - 4
    dude.speed = 2 + Math.random() * 2;

    // finally we push the dude into the aliens array so it it can be easily accessed later
    aliens.push(dude);

    app.stage.addChild(dude);
}
        // create a bounding box for the little dudes
        const dudeBoundsPadding = 0;
        const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
            -dudeBoundsPadding,
            app.screen.width + dudeBoundsPadding * 2,
            app.screen.height + dudeBoundsPadding * 2);

        app.ticker.add(() => {
            // iterate through the dudes and update their position
            for (let i = 0; i < aliens.length; i++) {
                const dude = aliens[i];
                dude.direction += dude.turningSpeed * 0.01;
                //dude.x -=  1 * dude.speed;
                dude.y -=  1 * dude.speed;
                dude.rotation = -dude.direction - Math.PI / 2;

                // wrap the dudes by testing their bounds...
                if (dude.x < dudeBounds.x) {
                    dude.x = Math.random() * app.screen.width;

                } else if (dude.x > dudeBounds.x + dudeBounds.width) {
                    dude.x = Math.random() * app.screen.width;
                }

                if (dude.y < dudeBounds.y) {
                    dude.y = app.screen.height;
                    dude.x = Math.random() * app.screen.width;
                } else if (dude.y > dudeBounds.y + dudeBounds.height) {
                    dude.y = app.screen.height;
                    dude.x = Math.random() * app.screen.width;
                }
            }
        });
  }

  function setSliderColor(){
    var sliderTop = jQuery('.products-slider').offset().top;
    var sliderHeight = jQuery('.products-slider').height();
    var welcomeTop = jQuery('.welcome').offset().top;
    var welcomeHeight = jQuery('.welcome').height();

      jQuery('.products-slider .slide-item').each(function(index, el){
        var rgbColor = jQuery(el).attr('bg-color').split(',');

        var r_f = parseInt(rgbColor[0]);
        var g_f = parseInt(rgbColor[1]);
        var b_f = parseInt(rgbColor[2]);

        var r_s = 255;
        var g_s = 252;
        var b_s = 235;

        var scrollTop = jQuery(document).scrollTop();
        if( (scrollTop > sliderTop) && (scrollTop < (sliderTop + sliderHeight)) ){

            if( (scrollTop - sliderTop) < 300){
                if(r_s != r_f){
                    var r = r_s - Math.round((scrollTop - sliderTop) / (300 / (r_s - r_f)) );
                } else {
                    r = r_s;
                }

                if(g_s != g_f){
                    var g = g_s - Math.round((scrollTop - sliderTop) / (300 / (g_s - g_f)) );
                } else {
                    g = g_s;
                }

                if(b_s != b_f){
                    var b = b_s - Math.round((scrollTop - sliderTop) / (300 / (b_s - b_f)) );
                } else {
                    var b = b_s;
                }
                jQuery(el).attr('current-bg-color', r +','+ g +','+ b);
            }

            if( (scrollTop - welcomeTop) > -360 && (scrollTop < (welcomeTop + welcomeHeight - 360)) ){
                var r = 255;
                var g = g_f + Math.round( (scrollTop - welcomeTop + 360) / (welcomeHeight / (g_s - g_f)) );
                var b = b_f + Math.round( (scrollTop - welcomeTop + 360) / (welcomeHeight / (b_s - b_f)) );
                jQuery(el).attr('current-bg-color', r +','+ g +','+ b);
            }

        } else {
            r = 255;
            g = 252;
            b = 235;
            jQuery(el).attr('current-bg-color', r +','+ g +','+ b);
        }
      });
  }

  function sliderBackgroundRGB(){
    jQuery(window).scroll(function(){
        setSliderColor();
        var currentSlideRGB = jQuery('.products-slider .active .slide-item').attr('current-bg-color');

        jQuery('.slider-bg-wrap').css({
            backgroundColor: 'rgb('+ currentSlideRGB +')',
        });
    });
}


function sliderBackgroundOpacity(){
    jQuery(document).ready(function(){
        var sliderTop = jQuery('.products-slider').offset().top;
        var sliderHeight = jQuery('.products-slider').height();
        var welcomeTop = jQuery('.welcome').offset().top;
        var welcomeHeight = jQuery('.welcome').height();

        var opacity;

        jQuery(window).scroll(function(){
            var scrollTop = jQuery(document).scrollTop();
            if( (scrollTop > sliderTop) && (scrollTop < (sliderTop + sliderHeight)) ){

                if( (scrollTop - sliderTop)  < 300 ){
                    opacity = (scrollTop - sliderTop) / 300;
                }

                if( (scrollTop - welcomeTop) > -160 && (scrollTop < (welcomeTop + welcomeHeight - 160)) ){
                    opacity = 1 - (scrollTop - (welcomeTop - 160)) / 360;
                }
            } else {
                opacity = 0
            }

            jQuery('.slider-bg-wrap').css({
                backgroundColor: 'rgba(255,179,129,'+ opacity +')',
            });
        });
    })
}

function countrySelect(){
    jQuery('#contact-country').niceSelect();

    jQuery(document).on('click', '.nice-select.delivery-plans-selector', function(event){
        if( jQuery('.nice-select.delivery-plans-selector').hasClass('active') ){
            jQuery('.nice-select.delivery-plans-selector').removeClass('active');
        } else {
            jQuery('.nice-select.delivery-plans-selector').addClass('active');
        }
    });
}

function transformSliderImage(){
    var mainSlide = jQuery('.products-slider img');
    mainSlide.addClass('img-img');
    var countIter = 300;

    var xMax = 1;
    var xMin = 0.988000;

    var yMax = 0.200808;
    var yMin = -0.1552;

    var zMax_1 = 10.1279;
    var zMin_1 = -10.38876;

    var zMax_2 = 15.279;
    var zMin_2 = -15.38876;

    var x_k =(xMax - xMin) / countIter;
    var y_k =(yMax - yMin) / countIter;

    var z_1_k =(zMax_1 - zMin_1) / (countIter/3);
    var z_2_k =(zMax_2 - zMin_2) / (countIter/3);

    console.log(x_k);
    console.log(y_k);
    x = xMax;
    y = yMin;
    z_1 = zMax_1;
    z_2 = zMin_1;
    var i = 1;
    var j = 1;
    setInterval(function(){
        // i = i + 0.01;
        // j = j + 0.01;
        mainSlide.attr('style', 'transform: matrix3d('+ x +','+ y +', 0, 0'+
                                            ','+ y * (-1) +','+ x +', 0, 0' +
                                            ',0, 0, 1, 0'+
                                            ','+ z_1 +','+ z_2 +', 0, 1)');

        x = x - x_k / i;
        y = y + y_k / i;
        z_1 = z_1 - z_1_k / j;
        z_2 = z_2 + z_2_k / j;

        if( (x > xMax) || (x < xMin) ){
            x_k = x_k * (-1);
            y_k = y_k * (-1);
            x = x;
            y = y;
            // i = 1;
        }

        if( (z_1 < zMin_1) || (z_1 > zMax_1) ){
            z_1_k = z_1_k * (-1);
            z_2_k = z_2_k * (-1);
            z_1 = z_1;
            z_2 = z_2;
            // j = 0;
        }


    }, 30);

    // mainSlide.css({
    //     'transform': 'matrix3d(0.999952, -0.00977821, 0, 0,'+
    //                            '0.00977821, 0.999952, 0, 0,' +
    //                            '0, 0, 1, 0,'+
    //                            '-8.53914, 0.154941, 0, 1)',
    // });
}

function productDetailsPopup(){
    jQuery('.product-details-popup').on('click', function(e){
        e.preventDefault();
        //jQuery('body').addClass('fixed');
        jQuery('.popup-product-details').addClass('active');

        jQuery('.close-popup').on('click', function(){
            jQuery('body').removeClass('fixed');
            jQuery('.popup-product-details').removeClass('active');
        });

        jQuery('.popup-product-details').on('click', function(event){
            if( jQuery(event.target).hasClass('popup-container') ){
                jQuery('body').removeClass('fixed');
                jQuery('.popup-product-details').removeClass('active');
            }
        })

    });
}

})(jQuery)

function selectProductIndex(product_id){
    $('.index-products-list-block').hide();
    $('#product_block_index_' + product_id).fadeIn(500);
}