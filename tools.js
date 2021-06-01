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


});//END