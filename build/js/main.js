var Holz = {
  init: function () {
    var self = this;
    self.phonesDrop();
    self.infoDrop();
  },
  phonesDrop: function() {    
    var phonesTopList = jQuery('.header__phones-list');
    jQuery('.header__phones').hover(function () {
      jQuery(phonesTopList).slideToggle(300).toggleClass('showed');
    });
  },
  infoDrop: function() {
    var self = this;
    self.infoTopList = jQuery('.header__top-menu');
    jQuery('.top-menu-btn').on('click', function() {
      jQuery(self.infoTopList).slideToggle(300).toggleClass('showed');
      jQuery(this).toggleClass('active');
    });
  },
  resizeInfoDrop: function() {
    var self = this;    
    self.windowWidth = jQuery(window).width();
    if (self.windowWidth >= 992) {
      jQuery(self.infoTopList).removeAttr('style');
    }
  }
}

var Carousels = {
    photoSlider: function() {
    var sync1 = $(".photo-slider__preview");
    var sync2 = $(".photo-slider__tmbs");
   
    sync1.owlCarousel({
      singleItem : true,
      slideSpeed : 1000,
      navigation: false,
      pagination: false,
      afterAction : syncPosition,
      responsiveRefreshRate : 200,
    });
   
    sync2.owlCarousel({
      items : 3,
      itemsDesktop      : [1199,3],
      itemsDesktopSmall     : [1130,3],
      itemsTablet       : [768,3],
      itemsMobile       : [450,3],
      navigation: true,
      pagination: false,
      responsiveRefreshRate : 100,
      navigationText: [
        "<span class='ico-arrow-s'></span>",
        "<span class='ico-arrow-s--next'></span>"
      ],
      afterInit : function(el){
        el.find(".owl-item").eq(0).addClass("synced");
      }
    });
   
    function syncPosition(el){
      var current = this.currentItem;
      $(".photo-slider__tmbs")
        .find(".owl-item")
        .removeClass("synced")
        .eq(current)
        .addClass("synced")
      if($(".photo-slider__tmbs").data("owlCarousel") !== undefined){
        center(current)
      }
    }
   
    $(".photo-slider__tmbs").on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = $(this).data("owlItem");
      sync1.trigger("owl.goTo",number);
    });
   
    function center(number){
      var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
      var num = number;
      var found = false;
      for(var i in sync2visible){
        if(num === sync2visible[i]){
          var found = true;
        }
      }
   
      if(found===false){
        if(num>sync2visible[sync2visible.length-1]){
          sync2.trigger("owl.goTo", num - sync2visible.length+2)
        }else{
          if(num - 1 === -1){
            num = 0;
          }
          sync2.trigger("owl.goTo", num);
        }
      } else if(num === sync2visible[sync2visible.length-1]){
        sync2.trigger("owl.goTo", sync2visible[1])
      } else if(num === sync2visible[0]){
        sync2.trigger("owl.goTo", num-1)
      }   
    }
   
  }
}

var Elements = {
  choiseBlock: function() {
    jQuery('.choise-param').niceSelect();
  }
}

jQuery(document).ready(function (){
  Holz.init();
  Carousels.photoSlider();
  Elements.choiseBlock();
});

jQuery(window).on('load', function () {
  Carousels.photoSlider();
});

jQuery(window).on('resize', function () {
  Holz.resizeInfoDrop();
});