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
    /*
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
    */

    //Word select
    $(document).on('change', '.probability-guide-word-select', function() {
        var value = $(this).val();
        //Set marker
        var marker = $('.probability-guide-scale-marker');
        if(value != '') {
            var array = value.split('-');
            var start = array[0];
            var width = array[1];
            marker.css('left', start + '%');
            marker.css('width', width + '%');
        }
        else {
            marker.css('left', '50%');
            marker.css('width', '0%');
        }
        //Set info
        var infoandtips = $('.probability-guide-info-and-tips');
        var info = infoandtips.find('.probability-guide-info');
        info.children().removeClass('js-visible');
        infoandtips.removeClass('js-visible');
        if(value != '') {
            infoandtips.addClass('js-visible');
            info.children().eq($(this).prop('selectedIndex') - 1).addClass('js-visible');
        }
    });
    //More tips
    $(document).on('click', '.probability-guide-show-tips-button', function() {
        $(this).next('.probability-guide-tips-wrapper').addClass('js-visible');
        $(this).addClass('js-hidden');
    });


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
            $('.dropdown-menu').removeClass('js-visible');
            $('.dropdown-toggle').children().removeClass('js-active');
            $('.tooltip').removeClass('js-visible');
        }
    });
    //Hide dropdown if click non-disabled button primary in dropdown menu
    $(document).on('click', '.dropdown-menu .button-primary',  function (e) {
        if(!$(e.target).hasClass('js-disabled')) {
            $('.dropdown-menu').removeClass('js-visible');
            $('.dropdown-toggle').children().removeClass('js-active');
            $('.tooltip').removeClass('js-visible');
        }
    });

    //Unlink issue probabilities switch results switch
    $(document).on('click', '.issues-switch', function() {
        //Toggle switch
        $(this).toggleClass('js-active');
        $(this).children('.switch-knob').toggleClass('js-active');
        //Toggle End results sidebar
        if(!$(this).hasClass('js-active')) {//Switch turned off
            var planwrapper = $('.plan-wrapper')
            //Issue 2
            var issue2cards = planwrapper.find('.card-issue-2');
            for(i = 0; i < 2; i++) {
                if(i === 0) {
                    var prob1 = issue2cards.eq(i).children('.event').eq(0).attr('data-eventprobability')
                    var prob1formatted = (prob1 * 100).toLocaleString(undefined, {maximumFractionDigits: 0})
                    var prob2 = issue2cards.eq(i).children('.event').eq(1).attr('data-eventprobability')
                    var prob2formatted = (prob2 * 100).toLocaleString(undefined, {maximumFractionDigits: 0})
                }
                else {
                    issue2cards.eq(i).children('.event').eq(0).attr('data-eventprobability', prob1)
                    issue2cards.eq(i).children('.event').eq(0).children('.event-details').find('.probability-value').text(prob1formatted)
                    issue2cards.eq(i).children('.event').eq(1).attr('data-eventprobability', prob2)
                    issue2cards.eq(i).children('.event').eq(1).children('.event-details').find('.probability-value').text(prob2formatted)
                }
            }
            //Issue 3
            var issue3cards = planwrapper.find('.card-issue-3');
            for(i = 0; i < 4; i++) {
                if(i === 0) {
                    var prob1 = issue3cards.eq(i).children('.event').eq(0).attr('data-eventprobability')
                    var prob1formatted = (prob1 * 100).toLocaleString(undefined, {maximumFractionDigits: 0})
                    var prob2 = issue3cards.eq(i).children('.event').eq(1).attr('data-eventprobability')
                    var prob2formatted = (prob2 * 100).toLocaleString(undefined, {maximumFractionDigits: 0})
                }
                else {
                    issue3cards.eq(i).children('.event').eq(0).attr('data-eventprobability', prob1)
                    issue3cards.eq(i).children('.event').eq(0).children('.event-details').find('.probability-value').text(prob1formatted)
                    issue3cards.eq(i).children('.event').eq(1).attr('data-eventprobability', prob2)
                    issue3cards.eq(i).children('.event').eq(1).children('.event-details').find('.probability-value').text(prob2formatted)
                }
            }
            //End card update
            endcardupdate();
        }
        if($(this).hasClass('js-active')) {//Switch turned on

        }
    });

    //EDIT PROBABILITIES
    $('.plan-wrapper').on('click', '.card-menu-button', function() {
        var planwrapper = $('.plan-wrapper');
        var card = $(this).closest('.card');
        var events = card.children('.event');
        var cardheader = $(this).closest('.card-header');
        var probmenu = cardheader.find('.edit-probabilities-menu');
        var sliderwrapper = probmenu.find('.edit-probabilities-slider-wrapper');
        //Show event arrows
        events.children('.event-details').find('.event-arrow').addClass('js-opaque');
        var ancestoreventdetails = $(this).parents('.card, .end-card').siblings('.event-details');
        var ancestoreventarrows = ancestoreventdetails.find('.event-arrow');
        ancestoreventarrows.addClass('js-opaque');
        //Remove children from all slider wrappers
        $('.edit-probabilities-slider-wrapper').children().remove();
        sliderwrapper.append('<div id="probabilityslider" style="height: 200px"></div>');
        var slider = document.getElementById('probabilityslider');
        //Create sliders based on events number
        var probability = parseFloat(events.eq(0).attr('data-eventprobability'));
        //Create slider
        noUiSlider.create(slider, {
            start: probability,
            step: 0.01,
            range: {
            'min': 0,
            'max': 1
            },
            margin: 0.01,
            padding: 0.01,
            orientation: 'vertical',
            keyboardSupport: true
        })
        //Update slider
        var cards;
        var issuesswitch = $('.issues-switch');
        if(issuesswitch.hasClass('js-active')) {cards = card}
        else {
            if(card.hasClass('card-issue-1')) {cards = card}
            if(card.hasClass('card-issue-2')) {cards = planwrapper.find('.card-issue-2')}
            if(card.hasClass('card-issue-3')) {cards = planwrapper.find('.card-issue-3')}
        }
        slider.noUiSlider.on('update', function(values) {
            cards.each(function(){
                events = $(this).children('.event');
                for(i = 0; i < 2; i++) {
                    var probability;
                    if(i === 0) {probability = values[0]};
                    if(i === 1) {probability = 1 - values[0]};
                    var formattedprobability = (probability * 100).toLocaleString(undefined, {maximumFractionDigits: 0});
                    events.eq(i).children('.event-details').find('.probability-value').text(formattedprobability);
                    events.eq(i).attr('data-eventprobability', probability)
                }
            })
            //End card update
            endcardupdate()
        });
    });
    //Hide edit probabilities event arrows if click outside
    $(document).on('click', function (e) {
        if(!$(e.target).closest('.dropdown').length && !$(e.target).closest('.end-card').length) {
            var planwrapper = $('.plan-wrapper');
            planwrapper.find('.event-arrow').removeClass('js-opaque');
        }
    });

    function endcardupdate() {
        $('.plan-wrapper').find('.end-card').each(function() {
            var ancestorevents = $(this).parents('.event');
            var probabilityvalue = 1;
            ancestorevents.each(function() {
                var eventprobability = parseFloat($(this).attr('data-eventprobability'));
                probabilityvalue *= eventprobability;
            });
            probabilityvalue2 = (probabilityvalue * 100).toLocaleString(undefined, {maximumFractionDigits: 2});
            $(this).find('.probability-value').text(probabilityvalue2);
        });
    }

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
    /*
    //Remove event active class when event name blurs
    $('.plan-wrapper').on('blur', '.event-name', function () {
        $(this).closest('.event').removeClass('js-event-active');
        $(this).closest('.card').removeClass('js-card-active');
    });
    */

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
            planwrapper.find('.event-arrow').removeClass('js-opaque');
            el.children('.event-arrow').addClass('js-opaque');
            el.children('.end-results-header').addClass('js-opaque');
            //Animateeventpath
            var ancestoreventdetails = el.parents('.card, .end-card').siblings('.event-details');
            var ancestoreventarrows = ancestoreventdetails.find('.event-arrow');
            ancestoreventarrows.addClass('js-opaque');
        }, 200);
    }).on('mouseleave', '.end-results-wrapper', function() {
        var planwrapper = $('.plan-wrapper');
        clearTimeout(endresultshovertimeout);
        planwrapper.find('.end-results-header').removeClass('js-opaque');
        planwrapper.find('.event-arrow').removeClass('js-opaque');
    });

    /*
    //ON FOCUS EVENT NAME
    $('.plan-wrapper').on('click focus', '.event-name', function() {
        $(this).siblings('.event-arrow').addClass('js-opaque');
        //Animateeventpath
        var ancestoreventdetails = $(this).parents('.card, .end-card').siblings('.event-details');
        var ancestoreventarrows = ancestoreventdetails.find('.event-arrow');
        ancestoreventarrows.addClass('js-opaque');
    });
    $('.plan-wrapper').on('blur', '.event-name', function() {
        $('.event-arrow').removeClass('js-opaque');
        $('.event-name').css('top','');
        $('.event-arrow').css({'top':'', 'bottom':''});
    });
    */

    /*
    //ADD CARD**********************
    $('.plan-wrapper').on('click', '.new-card-plus', function() {
        var endcard = $(this).closest('.end-card')
        var newcard = $('.plan-components').find('.card');
        newcard.clone().insertAfter(endcard);
        endcard.remove();
    });
    */

});//END
