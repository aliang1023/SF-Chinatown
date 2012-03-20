
$(document).ready(function (){
	initialize();
});

var pinkParksStyles = [
  {
    featureType: "road",
    stylers: [
      { saturation: -67 },
      { lightness: -16 },
      { hue: "#00ccff" }
    ]
  },{
    featureType: "administrative",
    stylers: [
      { hue: "#ff00b2" },
      { saturation: 25 },
      { visibility: "on" },
      { lightness: 64 }
    ]
  },{
    featureType: "landscape",
    stylers: [
      { invert_lightness: true },
      { visibility: "on" },
      { gamma: 4.42 },
      { hue: "#00ff6f" },
      { saturation: -53 },
      { lightness: 38 }
    ]
  },{
    featureType: "poi",
    stylers: [
      { visibility: "on" },
      { hue: "#eeff00" },
      { saturation: 23 }
    ]
  }
]

// Create a new StyledMapType object, passing it the array of styles,
// as well as the name to be displayed on the map type control.
var pinkMapType = new google.maps.StyledMapType(pinkParksStyles,{name: "Chinatown Styles"});
 
var map;
var tourPath;
// initialize empty array
var gmarkers = [];
var pathArray = [];

function listclick(list,category) {
	showMarkers();
	markersToggle(category);
}

function markersToggle(category) {
	// Looping through the gmarkers array
	for (var i=0; i<gmarkers.length; i++) {
		if (gmarkers[i].mycategory == category) {
			gmarkers[i].setVisible(true);
		} else {
			gmarkers[i].setVisible(false);
		}
	}
}

function drawTour() {
	clearDrawTour();
	// Creating a series of line segments that connect locations in an ordered sequence
	var tourPlanCoordinates = [
		new google.maps.LatLng(37.79786,-122.407735),
		new google.maps.LatLng(37.796879,-122.4068),
		new google.maps.LatLng(37.796466,-122.406796),
		new google.maps.LatLng(37.795605,-122.407358),
		new google.maps.LatLng(37.795455,-122.406442),
		new google.maps.LatLng(37.795182,-122.406717),
		new google.maps.LatLng(37.79505,-122.406728),
		new google.maps.LatLng(37.79471,-122.406449),
		new google.maps.LatLng(37.793767,-122.408851),
		new google.maps.LatLng(37.793403,-122.406612),
		new google.maps.LatLng(37.793098,-122.40587)
		];
	// Creating the Polyline
	tourPath = new google.maps.Polyline({
		path: tourPlanCoordinates,
		strokeColor: "#FA7E04",
		strokeOpacity: 0.5,
		strokeWeight: 5
	});
	
	// To add the tourPath to the map, call setMap();
	// set polyline on map 
	tourPath.setMap(map);
	pathArray.push(tourPath);
	clearMarkers();
}

function clearDrawTour() {
	if (pathArray) {
		for (i in pathArray) {
	    	pathArray[i].setMap(null);
		}
	}
}

// Removes the overlays from the map, but keeps them in the array
function clearMarkers() {
	if (gmarkers) {
    	for (i in gmarkers) {
      		gmarkers[i].setMap(null);
    	}
  	}
}

// Shows any overlays currently in the array
function showMarkers() {
	if (gmarkers) {
    	for (i in gmarkers) {
      		gmarkers[i].setMap(map);
    	}
  	}
}
     
function initialize() {
 	var chinatown = new google.maps.LatLng(37.794138,-122.407791);
	// Creating an object literal containing the properties
	// we want to pass to the map
	var myOptions = {
		zoom: 17,
  		center: chinatown,
  		mapTypeControlOptions: {
     			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'pink_parks']
	    }
	};
	// Creating the map
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	//Associate the styled map with the MapTypeId and set it to display.
 	map.mapTypes.set('pink_parks', pinkMapType);
 	map.setMapTypeId('pink_parks');
	
	// Creating an InfoWindow with the content text passed by contentString
	var infowindow = new google.maps.InfoWindow;
	
	// Creating the temple icon
	var temple = new google.maps.MarkerImage('images/japanese-temple.png');
	
	function markerMaker(myLatlng, map, myCategory, place, description) {
		// Adding a marker to the map
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			mycategory: myCategory,
			title: place,
			contentString: description,
			icon: temple,
		});
	
		// Adding a click event to the marker
		google.maps.event.addListener(marker, 'click', appearInfoWindow);
		
		function appearInfoWindow() {
			var contentString = "<h3>"+ place +"</h3><p>"+description+"</p>";
			// Setting the content of the InfoWindow	
       		infowindow.setContent(contentString);
			// Calling the open method of the infoWindow
			// Tying the InfoWindow to the marker
			infowindow.open(map,marker);
		}
		gmarkers.push(marker);
	}

	var myLatlng = new google.maps.LatLng(37.795224,-122.409839);
	var myCategory = "street1";
	var place = "Chinatown Branch Library"
	var description = '<span class="info">Hello world1</span>'
	var marker = markerMaker(myLatlng, map, myCategory, place, description);  		
	
	var myLatlng = new google.maps.LatLng(37.79054,-122.40558);
	var myCategory = "street2";
	var place = "Chinatown Gateway"
	var description = '<span class="info">Hello world1</span>'
	var marker = markerMaker(myLatlng, map, myCategory, place, description);  
	
	var myLatlng = new google.maps.LatLng(37.795101,-122.406202);
	var myCategory = "street2";
	var place = "Chinatown Telephone Exchange Building"
	var description = '<span class="info">Hello world1</span>';
	var marker = markerMaker(myLatlng, map, myCategory, place, description);  
	
	var myLatlng = new google.maps.LatLng(37.793276,-122.406805);
	var myCategory = "street3";
	var place = "Chinatown YMCA"
	var description = '<span class="info">Hello world1</span>';
	var marker = markerMaker(myLatlng, map, myCategory, place, description); 
	
	var myLatlng = new google.maps.LatLng(37.793512,-122.405191);
	var myCategory = "street3";
	var place = "Chinese Chamber of Commerce"
	var description = '<span class="info">Hello world2</span>';
	var marker = markerMaker(myLatlng, map, myCategory, place, description); 
	
	var myLatlng = new google.maps.LatLng(37.793509,-122.407172);
	var myCategory = "street3";
	var place = "Chinese Playground"
	var description = '<span class="info">Hello world3</span>';
	var marker = markerMaker(myLatlng, map, myCategory, place, description);
}

