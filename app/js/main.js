jQuery(window).on('load', function(){
	/*			PHONES_DOWN 		*/
	jQuery('.elsePhone').on('click', function(){
	    if(!jQuery(this).hasClass('activeDown')){
	      $('.phone_select>ul').slideDown('fast');
	      jQuery(this).addClass('activeDown');
	    } else {
	      $('.phone_select>ul').slideUp('fast');
	      jQuery(this).removeClass('activeDown');
	    }
	});
	$(document).mouseup(function (e) {
	    var containerDrop = $(".phone_select>ul");
	    if (containerDrop.has(e.target).length === 0){
	        containerDrop.slideUp('fast');
	        $('.elsePhone').removeClass('activeDown');
	    }
	});
	
	/*			INFO_DOWN		*/
	jQuery('.info_menu>.mobile').on('click', function(){
	    if(!jQuery(this).hasClass('activeDown')){
	      $('.info_menu>ul').slideDown('fast');
	      jQuery(this).addClass('activeDown');
	    } else {
	      $('.info_menu>ul').slideUp('fast');
	      jQuery(this).removeClass('activeDown');
	    }
	});

	/*			SEARCH_DOWN		*/
	jQuery('.search>.mobile').on('click', function(){
	    if(!jQuery(this).hasClass('activeDown')){
	      $('.search_holder').slideDown('fast');
	      jQuery(this).addClass('activeDown');
	    } else {
	      $('.search_holder').slideUp('fast');
	      jQuery(this).removeClass('activeDown');
	    }
	});

	/*			MAIN_MENU_DOWN		*/
	jQuery('.main_menu>.mobile').on('click', function(){
	    if(!jQuery(this).hasClass('activeDown')){
	      $('.main_menu>ul').slideDown('fast');
	      jQuery(this).addClass('activeDown');
	    } else {
	      $('.main_menu>ul').slideUp('fast');
	      jQuery(this).removeClass('activeDown');
	    }
	});

	/*			DOOR_PREVIEW 		*/
	$('#carousel').flexslider({
	    animation: "slide",
	    controlNav: false,
	    animationLoop: false,
	    slideshow: false,
	    itemWidth: 70,
	    itemMargin: 10,
	    minItems:1,
	    maxItems:3,
	    asNavFor: '#slider'
	}); 
	$('#slider').flexslider({
    	animation: "slide",
    	controlNav: false,
    	animationLoop: false,
    	smoothHeight: true,
    	slideshow: false,
    	sync: "#carousel"
  	});

  	/*			TOOLTIPS 			*/
  	$(function() {
    	$('.tooltip>input').tooltip({
    		position: {
        	my: "right bottom-5",
        	at: "center top"
        	}
    	});
  	});

  	/*				TABS 			*/
  	$(function() {
    	$( "#tabsDoor" ).tabs();
	});

	/*			SPINNER 		*/
	 $( "#spinner" ).spinner({
	 	min: 1,
	 	max: 999,
	 	step: 1,
	 	start: 1
	 });

	/*				CAROUSEL_SLIDERS 			*/
	$('.accesSlider').bxSlider({
		minSlides: 1,
		maxSlides: 4,
		moveSlides: 1,
		slideMargin: 15,
		pager: true,
		touchEnabled: true,
		nextSelector: '.pager1>li:first-child',
		prevSelector: '.pager1>li:last-child'
	});
	$('.sameSlider').bxSlider({
		moveSlides: 1,
		pager: true,
		touchEnabled: true,
		nextSelector: '.pager3>li:first-child',
		prevSelector: '.pager3>li:last-child'
	});
	$('.sliderBefore').bxSlider({
		minSlides: 1,
		maxSlides: 3,
		moveSlides: 1,
		pager: false,
		touchEnabled: true,
		nextSelector: '.pager2>li:first-child',
		prevSelector: '.pager2>li:last-child'
	});
});

jQuery(window).on('resize', function(){
		if(jQuery(this).width() <= 785){
			$(document).mouseup(function (e) {
			    var containerDrop = $(".info_menu>ul");
			    if (containerDrop.has(e.target).length === 0){
			        containerDrop.slideUp('fast');
			        $('.info_menu>.mobile').removeClass('activeDown');
			    }
			});
			$(document).mouseup(function (e) {
			    var containerDrop = $(".main_menu>ul");
			    if (containerDrop.has(e.target).length === 0){
			        containerDrop.slideUp('fast');
			        $('.main_menu>.mobile').removeClass('activeDown');
			    }
			});
			$(document).mouseup(function (e) {
			    var containerDrop = $(".search_holder");
			    if (containerDrop.has(e.target).length === 0){
			        containerDrop.slideUp('fast');
			        $('.search>.mobile').removeClass('activeDown');
			    }
			});
		}
});