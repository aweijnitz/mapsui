
function initialize() {
    var map;
    var brooklyn = new google.maps.LatLng(59.3296, 18.069);

    var MY_MAPTYPE_ID = 'custom_style';

    var featureOpts = [
        {
            stylers: [
                { hue: '#890000' },
                { visibility: 'simplified' },
                { gamma: 0.5 },
                { weight: 0.5 }
            ]
        },
        {
            elementType: 'labels',
            stylers: [
                { visibility: 'off' }
            ]
        },
        {
            featureType: 'water',
            stylers: [
                { color: '#890000' }
            ]
        }
    ];

    var mapOptions = {
        zoom: 12,
        center: brooklyn,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

function initialize_old() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
}

$(document).ready(function () {

    // TODO: BEFORE LIVE, RESTRICT KEY ACCESS TO THE LIVE DOMAIN (REFERERS)
    var apiKey = "AIzaSyCcr1fAQXMW24RIjzodbgyv61ztbGHz9Us";


    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&' +
            'callback=initialize';
        document.body.appendChild(script);
    }

    window.onload = loadScript;

}); // end onReady