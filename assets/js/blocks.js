/******************************************************************
	
	
	@ Item          DVE // One Page Parallax HTML Template 
	@ Author		Au-Zone
	@ Website		https://dveml.com 
	

 ******************************************************************/
 
 
 /******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Work
	--  2. Process
	--  3. Team
	--  4. News
	--  5. Contact
 
 
 ******************************************************************/




/** 1. WORK
*******************************************************************/

$( document ).ready(function() {
     "use strict";



	// WORK GRID ( Cube Plugin )
    $(".work-grid").cubeportfolio({
        filters: "#js-filters-masonry",
        layoutMode: "grid",
        defaultFilter: "*",
        animationType: "quicksand",
        gapHorizontal: 50,
        gapVertical: 50,
		auto: true,
		sortToPreventGaps: true,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        plugins: {
            loadMore: {
                element: '#work-loadmore',
                action: 'click',
            }
        },                          
        caption: "revealTop",
        displayType: "default",
        displayTypeSpeed: 70,
        lightboxDelegate: ".cbp-lightbox",
        lightboxGallery: false,
        lightboxTitleSrc: "data-title",
        singlePageDelegate: ".cbp-singlePage",
        singlePageDeeplinking: false,
		singlePageAnimation: "fade",
        singlePageStickyNavigation: false,
        singlePageCallback: function(url, element) {
            var t = this;
            $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "html",
                    timeout: 10000
                })
                .done(function(result) {
                    t.updateSinglePage(result);
                })
                .fail(function() {
                    t.updateSinglePage("AJAX Error! Please refresh the page!");
                });
        },
		
    });



/** 2. PROCESS
*******************************************************************/
	 
	 
	 
	 // PROCESS SLIDER ( Cube Plugin )
	 $(".slider-process").cubeportfolio({
        layoutMode: "slider",
        drag: true,
        auto: false,
        showNavigation: false,
        showPagination: true,
        rewindNav: false,
        scrollByPage: false,
		singlePageDelegate: null,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 1500,
            cols: 1
        }],
        gapHorizontal: 0,
        gapVertical: 700,
        caption: "opacity",
        displayType: "fadeIn",
        displayTypeSpeed: 100,
    });
	
	
	function animateProcess() {
		
		var isDown = false;
		
		$(".slider-process .cbp-wrapper").mousedown(function(){
         
			$(".slider-process .cbp-wrapper .process-info-box").removeClass("active");
			isDown = true;
			
		});
		
		$(document).mouseup(function(){
			
			if(isDown){
				
				setTimeout(function(){
					
					$(".slider-process .cbp-wrapper .process-info-box").addClass("active");
					isDown = false;
					
				}, 500);
				
			}
			
		}); 
	
	
	} animateProcess();



/** 3. TEAM
*******************************************************************/ 
	 
	 
	 
	// TEAM SLIDER ( Cube Plugin )
    $(".slider-team").cubeportfolio({
		
        layoutMode: "slider",
        drag: true,
        auto: false,
        autoTimeout: 5000,
        autoPauseOnHover: true,
        showNavigation: false,
        showPagination: true,
        rewindNav: true,
        scrollByPage: true,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        gapHorizontal: 0,
        gapVertical: 50,
        caption: "revealTop",
        displayType: "fadeIn",
        displayTypeSpeed: 400,
		
		singlePageInlineDelegate: ".cbp-singlePageInline",
        singlePageInlinePosition: "bottom",
		singlePageDelegate: null,
        singlePageInlineInFocus: false,
        singlePageInlineCallback: function(url, element) {
            var t = this;
            $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "html",
                    timeout: 10000
                })
                .done(function(result) {

                    t.updateSinglePageInline(result);

                })
                .fail(function() {
                    t.updateSinglePageInline("AJAX Error! Please refresh the page!");
                });
        },	
		
    });



/** 4. NEWS
*******************************************************************/
	 
	 
	 
	// NEWS SLIDER ( Cube Plugin )
    $(".news-slider").cubeportfolio({
        layoutMode: "slider",
        drag: true,
        auto: false,
        showNavigation: false,
        showPagination: true,
        rewindNav: true,
        scrollByPage: true,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 800,
            cols: 2
        }, {
            width: 480,
            cols: 1
        }, {
            width: 320,
            cols: 1
        }],
        gapHorizontal: 0,
        gapVertical: 50,
        caption: "",
        displayType: "fadeIn",
        displayTypeSpeed: 400,
		singlePageDelegate: null,
    });




/** 5. CONTACT
*******************************************************************/
	 
	 
	 
	 //CONTACT FORM
	 $("#contact-form").submit(function(e) {
		 
		e.preventDefault();
         
	    var postdata = $(this).serializeArray(),
            pD_el_count = postdata.length;
         
        for( var count = 0; count < pD_el_count; count++ ){
            
            if( $("#contact-form input[name='" + postdata[count].name + "']").attr("data-require-filling") == "true" ) {  
                postdata.push( {name: postdata[count].name + "_required", value: true });
            } else {
                postdata.push( {name: postdata[count].name + "_required", value: false });
            }
        }
         
	    $.ajax({
            
	        type: "POST",
	        url: "assets/contact.php",
	        data: postdata,
	        dataType: "json",
	        success: function(json) {
				 
				$("#contact-form .form-group").removeClass("error");
				
				setTimeout(function(){
					
					if (json.nameMessage !== "") {
						$("#contact-form-name").parent().addClass("error");
					}
					
					if (json.emailMessage !== "") {
					   $("#contact-form-email").parent().addClass("error");
					}
                    
                    if (json.companyMessage !== "") {
					   $("#contact-form-company").parent().addClass("error");
					}
                    
                    if (json.phoneMessage !== "") {
					   $("#contact-form-phone").parent().addClass("error");
					}
                    
                    if (json.addressMessage !== "") {
					   $("#contact-form-address").parent().addClass("error");
					}
					
					if (json.subjectMessage !== "") {
					   $("#contact-form-subject").parent().addClass("error");
					}
					
					if (json.messageMessage !== "") {
						$("#contact-form-message").parent().addClass("error");
					}
					
				}, 25);
					
				if (json.succesMessage !== "") {
					
					$("#contact-form").addClass("success");
					$("#contact-form button span").removeClass("ti-arrow-right").addClass("ti-check");
					$("#contact-form input").attr("placeholder", "");
					$("#contact-form-message").attr("placeholder", json.succesMessage);
					$("#contact-form input,#contact-form button").val("").prop("disabled", true);
				}
	        }
			
	    });
		
	});

	// CONTACT BUTTON HOVER ADD/REMOVE CLASS
	$("#contact form button").hover(
	  
	  function() {
		$("#contact form .form-group.button-container").addClass("move");
	  }, function() { 
		$("#contact form  .form-group.button-container").removeClass("move");
	  }
	  
	);
	
	// FORM GROUP ADD CLASS WHEN INPUT IS FOCUSED
	$("#contact form input").focusin(function() {
		$(this).parent(".form-group").addClass("switch-color");
	});
	
	// FORM GROUP REMOVE CLASS WHEN INPUT IS NOT FOCUSED
	$("#contact form input").focusout(function() {
		$(this).parent(".form-group").removeClass("switch-color");
	});
	
	// CHANGING HEIGHT OF ELEMENT ON WINDOW RESIZE 
	$(window).on("resize", function(){
		$("#contact .map-wrapper").css("height",$("#contact .map-wrapper").width()*0.8);
	});
	
	// CHANGING HEIGHT OF ELEMENT WHEN TAB ( BOOTSTRAP) IS SHOWN 
	$('a[data-toggle="tab"]').on("shown.bs.tab", function () {
		$("#contact .map-wrapper").css("height",$("#contact .map-wrapper").width()*0.8);
	});
    
    // // GOOGLE MAPS API URL
    // var google_map_api_url = "https://maps.googleapis.com/maps/api/js";
    
    // // ADD KEY WHEN GIVEN TO GOOGLE MAPS API URL
    // if (  option_google_maps_api_key != "" && option_google_maps_api_key != "AIzaSyBibXe8KqGeC6orbxHN_32X2drJUN8WokWXE" ) {
    //     google_map_api_url =  google_map_api_url + "?key=" + option_google_maps_api_key;
    // }
    
    // // LOAD GOOGLE MAPS API AND LAUNCH SETUP
    // loadScript( google_map_api_url, function() {
	
    //     if( $("#map").length != 0 ) {
            
    //         // MAP / MARKER COORDINATES
    //         var mapCoordinates = new google.maps.LatLng(option_google_maps_coordinates[0], option_google_maps_coordinates[1]);

    //         // MAP ZOOM
    //         var mapZoom = 14;

    //         // MAP MARKER COLOR
    //         var mapMarkerColor = $(".block-contact-1 .tab-content .map-wrapper .button-description .content-visible").css("background-color");

    //         // MAP MARKER SIZE
    //         var mapMarkerSize = 12;

    //         // MAP MARKER OPACITY
    //         var mapMarkerOpacity = 1;

    //         // GOOGLE MAPS FUNCTION
    //         function mapInit() {

    //             // OPTIONS
    //             var mapOptions = {

    //                 zoom: mapZoom,

    //                 center:  mapCoordinates,
    //                  disableDefaultUI: true,

    //                 styles: [
    //                       {
    //                         "featureType": "All",
    //                         "elementType": "geometry.stroke",
    //                         "stylers": [
    //                           { "visibility": "simplified" }
    //                         ]
    //                       },{
    //                         "featureType": "landscape.man_made",
    //                         "elementType": "geometry.fill",
    //                         "stylers": [
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "landscape.natural",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "poi",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "transit.line",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "landscape",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "on" }
    //                         ]
    //                       },{
    //                         "featureType": "road.highway",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "on" },
    //                           { "weight": 1.8 },
    //                           { "saturation": -100 },
    //                           { "lightness": -42 },
    //                           { "gamma": 2 }
    //                         ]
    //                       },{
    //                         "featureType": "landscape.man_made",
    //                         "elementType": "labels",
    //                         "stylers": [
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                           { "saturation": -20 },
    //                           { "visibility": "simplified" }
    //                         ]
    //                       },{
    //                         "featureType": "water",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "lightness": -70 },
    //                           { "saturation": -84 }
    //                         ]
    //                       },{
    //                         "featureType": "landscape",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "gamma": 0.96 },
    //                           { "saturation": -100 },
    //                           { "lightness": -72 }
    //                         ]
    //                       },{
    //                         "featureType": "road.local",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "lightness": -78 },
    //                           { "gamma": 2.14 }
    //                         ]
    //                       },{
    //                         "featureType": "road.arterial",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "lightness": -74 },
    //                           { "gamma": 2.13 }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "labels.text.stroke",
    //                         "stylers": [
    //                           { "gamma": 0.40 }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "labels.text.stroke",
    //                         "stylers": [
    //                           { "gamma": 0.32 },
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "labels.text",
    //                         "stylers": [
    //                           { "saturation": -100 },
    //                           { "lightness": -100 },
    //                           { "gamma": 10 }
    //                         ]
    //                       },{
    //                         "featureType": "poi",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                           { "visibility": "simplified" }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "saturation": -82 },
    //                           { "lightness": -44 },
    //                           { "gamma": 0.9 }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "labels.text.fill",
    //                         "stylers": [
    //                           { "lightness": 68 }
    //                         ]
    //                       },{
    //                         "featureType": "poi",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "off" }
    //                         ]
    //                       },{
    //                         "featureType": "transit.line",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "simplified" },
    //                           { "lightness": -60 }
    //                         ]
    //                       },{
    //                         "featureType": "landscape.natural",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "visibility": "on" }
    //                         ]
    //                       },{
    //                         "featureType": "road.local",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "lightness": -59 }
    //                         ]
    //                       },{
    //                         "featureType": "road.arterial",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "saturation": 7 },
    //                           { "hue": "#0066ff" },
    //                           { "gamma": 0.9 }
    //                         ]
    //                       },{
    //                         "featureType": "transit",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "lightness": -38 },
    //                           { "gamma": 1.5 }
    //                         ]
    //                       },{
    //                         "featureType": "water",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "hue": "#0022ff" },
    //                           { "gamma": 1.4 },
    //                           { "lightness": -32 },
    //                           { "saturation": -4 }
    //                         ]
    //                       },{
    //                         "featureType": "administrative",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "lightness": -64 }
    //                         ]
    //                       },{
    //                         "featureType": "administrative.locality",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "lightness": 70 }
    //                         ]
    //                       },{
    //                         "featureType": "All",
    //                         "elementType": "All",
    //                         "stylers": [
    //                           { "saturation": 1 },
    //                           { "hue": "#0022ff" }
    //                         ]
    //                       },{
    //                         "featureType": "transit",
    //                         "elementType": "All"  },{
    //                         "featureType": "road.local",
    //                         "stylers": [
    //                           { "gamma": 0.9 }
    //                         ]
    //                       },{
    //                         "elementType": "labels.text.fill",
    //                         "stylers": [
    //                           { "lightness": 16 },
    //                           { "gamma": 1.0 }
    //                         ]
    //                       }
    //                     ]
    //             };

    //             // GET MAP
    //             var mapElement = document.getElementById("map");

    //             // CHECK IF MAP EXISTS TO PREVENT ERRORS
    //             if($('#map').length) {

    //                 // CREATES MAP
    //                 var map = new google.maps.Map(mapElement, mapOptions);;

    //             }

    //             // MARKER ICON OPTIONS
    //             var icon = {

    //                 path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    //                 fillColor: mapMarkerColor,
    //                 fillOpacity: mapMarkerOpacity,
    //                 anchor: new google.maps.Point(0,0),
    //                 strokeWeight: 0,
    //                 scale: mapMarkerSize

    //             }

    //             // SET MAP MARKER
    //             var marker = new google.maps.Marker({

    //                 position: mapCoordinates,
    //                 map: map,
    //                 icon: icon,
    //                 title: "Your Location!"

    //             }); 

    //             // RESIZE / RECENTER MAP FUNCTION
    //             function resizeMap() {

    //                 google.maps.event.trigger(map, "resize");
    //                 map.setCenter(marker.getPosition());

    //             }


    //             // CALL RESIZE / RECENTER MAP FUNCTION AFTER TAB( BOOTSTRAP ) IS SHOWN
    //             $('a[data-toggle="tab"]').on("shown.bs.tab", function () {

    //                 resizeMap();

    //             });

    //             marker.addListener("click", function() {

    //                     $(".tab-content .map-wrapper .button-description").addClass("active");
    //                     $(".tab-content .map-wrapper .container-info").addClass("active");

    //             });



    //         } google.maps.event.addDomListener(window, "load", mapInit);
            
    //     }  
        
    // });
	
	
	// OPEN/CLOSE POPUP DESCRIPTION ON BUTTON CLICK
	$("body").on("click",".tab-content .map-wrapper .button-description", function(){
		
		if ($(".tab-content .map-wrapper .button-description").hasClass("active")) {
			
			$(".tab-content .map-wrapper .container-info").removeClass("active");
			$(".tab-content .map-wrapper .button-description").removeClass("active");
		  
		} else {
			
			$(".tab-content .map-wrapper .button-description").addClass("active");
		    $(".tab-content .map-wrapper .container-info").addClass("active");
			
		}
		
	});
	
	// CLOSE POPUP DESCRIPTION WHEN OTHER CONTENT IS CLICK
	$("body").on("mousedown","#map", function(){
		
		if ($(".tab-content .map-wrapper .button-description").hasClass("active")) {
			
			setTimeout(function() {	
			
				$(".tab-content .map-wrapper .container-info").removeClass("active");
				$(".tab-content .map-wrapper .button-description").removeClass("active");
				
			}, 100);
			 
		}
		
	});

	
		
});