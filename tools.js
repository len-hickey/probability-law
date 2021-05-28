$(function() {

    var sliderwrapper = $('.slider-wrapper');
    //Set element IDs for noUiSlider
    sliderwrapper.children().remove();//Remove children from slider wrapper
    sliderwrapper.append('<div id="slider"></div>');
    var slider = document.getElementById('zoomslider');
    //Create sliders based on events number
    //Create slider
    noUiSlider.create(slider, {
    start: 0,
    step: 1,
    range: {
        'min': 0,
        'max': 100
    },
    keyboardSupport: true
    })


});//END