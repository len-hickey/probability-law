$(function() {


    //TABS
    $('.tabs-wrapper').on('click', '.tab-button', function() {
    var tabbuttonwrapper = $(this).closest('.tab-button-wrapper');
    var tabswrapper = $(this).closest('.tabs-wrapper');
    var tabindex = tabbuttonwrapper.children('.tab-button').index(this);
    tabswrapper.find('.tab-button').removeClass('js-active');
    tabswrapper.find('.tab-content').removeClass('js-visible');
    $(this).addClass('js-active');
    tabswrapper.find('.tab-content').eq(tabindex).addClass('js-visible');
    });

    //*************************************TOOL 1*************************************
    //Slider
    var sliderwrapper = $('.slider-wrapper');
    //Set element IDs for noUiSlider
    sliderwrapper.children().remove();//Remove children from slider wrapper
    sliderwrapper.append('<div id="slider"></div>');
    var slider = document.getElementById('slider');
    //Create sliders based on events number
    //Create slider
    noUiSlider.create(slider, {
    start: 50,
    step: 1,
    range: {
        'min': 0,
        'max': 100
    },
    keyboardSupport: true
    })


    //*************************************TOOL 2*************************************
    //DROPDOWNS
    //Open dropdown
    $(document).on('click', '.dropdown-toggle', function() {
        //Show dropdown menu
        $('.dropdown-menu').not($(this).siblings()).removeClass('js-visible');
        $(this).siblings('.dropdown-menu').toggleClass('js-visible');
        //Toggle dropdown button active state
        $('.dropdown-toggle').not($(this)).children().removeClass('js-active');
        $(this).children().toggleClass('js-active');
    });
    //Hide dropdown if click outside
    $(document).on('click', function (e) {
        if(!$(e.target).closest('.dropdown').length) {
        hidealldropdownsandtooltips()
        //Remove context menu class
        $('.js-context-menu').removeClass('js-context-menu');
        }
    });
    //Hide dropdown if click non-disabled button primary in dropdown menu
    $(document).on('click', '.dropdown-menu .button-primary',  function (e) {
        if(!$(e.target).hasClass('js-disabled')) {
        hidealldropdownsandtooltips()
        }
    });

    //CARD INTERACTIONS**********************
    //Card active function
    function activecard(e) {
        var card = $(e.target).closest('.card');
        setTimeout(function(card) {
            card.add('.plan-wrapper').toggleClass('js-card-active', card.find('.js-active, .event-name:focus').length > 0);
        }, 10, card);
    }
    //Toggle card focus when dropdown menus are opened and event names focused
    $('.plan-wrapper').on('click', '.card', activecard);
    $('.plan-wrapper').on('click focus', '.card .event-name', activecard);
    //When event details clicked, set z-index of event to higher value
    $('.plan-wrapper').on('click', '.event-name', function() {
        $('.event').removeClass('js-event-active');
        $(this).closest('.event').addClass('js-event-active');
    });
    //Remove card active classes when click outside cards
    $(document).on('click', function (e) {
        if(!$(e.target).closest('.card').length) {
        $('.event.js-event-active').removeClass('js-event-active');
        $('.card.js-card-active').removeClass('js-card-active');
        $('.plan-wrapper.js-card-active').removeClass('js-card-active');
        }
    });
    //Remove event active class when event name blurs
    $('.plan-wrapper').on('blur', '.event-name', function () {
        $(this).closest('.event').removeClass('js-event-active');
        $(this).closest('.card').removeClass('js-card-active');
    });
    //HOVER CARDS
    $('.plan-wrapper').on('mouseover', '.end-card', function(e) {
        e.stopPropagation();
    }).on('mouseover', '.card', function(e) {
        e.stopPropagation();
        $(this).addClass('js-card-hover');
    }).on('mouseout', '.card', function(e) {
        $(this).removeClass('js-card-hover');
    });
    //ON HOVER END RESULTS
    var endresultshovertimeout;
    $('.plan-wrapper').on('mouseenter', '.end-results-wrapper', function() {
        var el = $(this);//Necessary for setTimeout to work
        endresultshovertimeout = setTimeout(function() {
        var planwrapper = $('.plan-wrapper');
        planwrapper.find('.event-arrow').removeClass('js-opaque-1');
        planwrapper.find('.end-results-sidebar-line').removeClass('js-active');
        el.children('.event-arrow').addClass('js-opaque-1');
        el.children('.end-results-header').addClass('js-opaque');
        el.children('.end-card-probability').addClass('js-opaque-1');
        el.closest('.end-card').prev('.end-results-sidebar-line').addClass('js-active');
        animateeventpath(el);
        }, 200);
    }).on('mouseleave', '.end-results-wrapper', function() {
        var planwrapper = $('.plan-wrapper');
        clearTimeout(endresultshovertimeout);
        planwrapper.find('.end-results-header').removeClass('js-opaque');
        planwrapper.find('.end-card-probability').removeClass('js-opaque-1');
        planwrapper.find('.event-arrow').removeClass('js-opaque-1');
        planwrapper.find('.end-results-sidebar-line').removeClass('js-active');
        planwrapper.find('.event-name').css('top','');
        planwrapper.find('.event-arrow').css({'top':'', 'bottom':''});
    });
    //ON FOCUS EVENT NAME
    $('.plan-wrapper').on('click focus', '.event-name', function() {
        $(this).siblings('.event-arrow').addClass('js-opaque-1');
        animateeventpath($(this));
    });
    $('.plan-wrapper').on('blur', '.event-name', function() {
        $('.event-arrow').removeClass('js-opaque-1');
        $('.event-name').css('top','');
        $('.event-arrow').css({'top':'', 'bottom':''});
    });



});//END