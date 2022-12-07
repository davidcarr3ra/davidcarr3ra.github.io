// /*-----------------------------------------------------------------------------------
// /*
// /* Init JS
// /*
// -----------------------------------------------------------------------------------*/

// // jQuery(document).ready(function($) {
// $(document).ready(function() {

// /*----------------------------------------------------*/
// /* Smooth Scrolling
// ------------------------------------------------------*/

//    $('.smoothscroll').on('click',function (e) {
// 	    e.preventDefault();

// 	    var target = this.hash,
// 	    $target = $(target);

// 	    $('html, body').stop().animate({
// 	        'scrollTop': $target.offset().top
// 	    }, 800, 'swing', function () {
// 	        window.location.hash = target;
// 	    });
// 	});


// /*----------------------------------------------------*/
// /* Highlight the current section in the navigation bar
// ------------------------------------------------------*/

//   /* ------- https://www.youtube.com/watch?v=x0YnVwAuNQI */ 

//   var scrollLink = $('.smoothscroll')
//   $(window).scroll(function() {
//     var scrollbarLocation = $(this).scrollTop();
//     scrollLink.each(function() {
//       var sectionOffset = $(this.hash).offset().top - 200;
//       if(sectionOffset <= scrollbarLocation) {
//         $(this).parent().addClass("current");
//         $(this).parent().siblings().removeClass("current");
//       }
//     })
//   })

//   // ALTERNATIVELY, USE OLD JQUERY


//   /* http://imakewebthings.com/waypoints/guides/jquery-zepto/ */ 

//   // var navigation_links = $("#nav-wrap a");

//   // function highlightNav(navElement) {
//   //   navigation_links.parent().removeClass("current");
//   //   navElement.parent().addClass("current");
//   // }

//   // $(window).scroll(function(){
//   //   if($(this).scrollTop() == 0) {
//   //       highlightNav($("#nav-bar a[href*='home']"));
//   //   } 
//   // });

//   // var sections = $("section");
//   // sections.waypoint(function() {
//   //     var id = this.id;
//   //     var op = $('#nav-bar a[href = "#' + id + '"]');
//   //     if (op.length) {
//   //         highlightNav(op);
//   //     }
//   // }, {
//   //   offset: '35%'
//   // });

// /*----------------------------------------------------*/
// /*	Make sure that #header-background-image height is
// /* equal to the browser height.
// --------------------c---------------------------------- */

//    // $('header').css({ 'height': $(window).height() });
//    // $(window).on('resize', function() {

//    //      $('header').css({ 'height': $(window).height() });
//    //      $('body').css({ 'width': $(window).width() })
//    // });


// /*----------------------------------------------------*/
// /*	Fade In/Out Primary Navigation
// ------------------------------------------------------*/

//    // $(window).on('scroll', function() {
//    $(window).scroll(function() {
//   		var h = $('header').height();
//   		var y = $(window).scrollTop();

//       var nav = $('#nav-wrap');

//   	  if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
//   	      nav.fadeOut('fast');
//   	  } else {
//            if (y < h*.20) {
//               nav.removeClass('opaque').fadeIn('fast');
//            }
//            else {
//               nav.addClass('opaque').fadeIn('fast');
//            }
//       }

// 	});

// });









