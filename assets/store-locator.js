$( document ).ready(function() {

    $('#loading-map').fadeOut(700).fadeIn(700).fadeOut(700).fadeIn(700).fadeOut(700).fadeIn(700).fadeOut(700).fadeIn(700);

    const file   = csv_file;
    const reader = new FileReader();

    $.ajax({
        url: file,
        dataType: 'text',
    }).done(function(data){
        var markersArr = csvToArray(data);
        var res_html = '';
        markersArr.forEach((element) => {
            if(element[0]) {
                var address_2 = element[2] + ', ' + element[4] + ', ' + element[3]
                res_html = res_html + htmlMarkerBlock(element[0], element[1], address_2, element[5], element[6]);
            }
        });

        $('#mylist').html(res_html);
        setTimeout(function(){
            initStoreLocation();
            setTimeout(function(){
                $('#loading-map').remove();
                $('#map_page').fadeIn(700);
                initialize();
            }, 1000);
        }, 500);
    });

});

function initStoreLocation() {
    'use strict';
    var filter = $('input#filterinput');
    var clearfilter = $('input#clearfilter');

    $('div#mylist').listfilter({
        'filter': filter,
        'alternate': true,
        'alternateclass': 'other',
        'callback' : reloadMarkers
    });
}


function htmlMarkerBlock(title, address, city, lat, lng){
    var html = '<div style="cursor: pointer;" onclick="showThisLocationOnMap(\'' + lat + '\',\'' + lng + '\')" class="item store-element" data-address="' + address + '" data-address_2="' + city + '" data-lat="' + lat + '" data-long="' + lng + '" data-title="' + title + '">\n' +
        '<div class="number"><span></span></div>\n' +
        '<div class="description">\n' +
        '<span>' + title + '</span>\n' +
        '<span>' + address + '</span>\n' +
        '<span>' + city + '</span>\n' +
        '</div>\n' +
        '</div>';

    return html;
}

function getText(file_url){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', file_url, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;
            }
        }
    }
}


var map;
var markers = [];
var infoWindow = null;
function setMarkers(locations) {
    var j=1;
    for (var i = 0; i < locations.length; i++) {
        var store = locations[i];
        var myLatLng = new google.maps.LatLng(store[1], store[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: store[0],
            icon: {
                url: icon_url,
                size: new google.maps.Size(44, 44),
                origin: new google.maps.Point(0, 0)
            }
        });
        map.addListener("center_changed", () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            //window.setTimeout(() => {
               // map.panTo(marker.getPosition());
           // }, 3000);
        });
        console.log(store);
        addInfoWindow(marker, store[0] + ', <br/>'+ store[3] +'<br/><a target="_blank" href="https://www.google.com/maps?q='+ store[0] +','+ store[3] +','+store[4]+'">Open on Google Map ></a>');
        markers.push(marker);
    }
}

function addInfoWindow(marker, message, i) {

    var infoWindow = new google.maps.InfoWindow({
        content: message
    });

    google.maps.event.addListener(marker, 'click', function () {
        map.setZoom(13);
        map.panTo(this.position);
        infoWindow.open(map, marker);
    });

}

function reloadMarkers() {

    jQuery('.search-resaults-wrap').css("display", "block");
    jQuery('.no-resaults').css("display", "none");

    for (var i=0; i<markers.length; i++) {
        markers[i].setMap(null);
    }

    markers = [];

    $('.number').show();
    var j = 1;
    $('.store-element').each(function(i,elem) {
        if($(elem).is(':visible')){
            $(elem).children('.number span').text(j++);
        }
    });

    var storesList = getStoresList();

    if(storesList.length > 0 ){
        setMarkers(storesList);
    } else {

        $.get( "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAl7mw8OxgNDyah_lbGikt1Q0CUr7jKVDI&address=" + encodeURI($('input#filterinput').val()), function( data ) {
            if(typeof data.results[0].geometry.location.lat !== 'undefined' && typeof data.results[0].geometry.location.lng !== 'undefined'){
                searchLocationByRadius(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng, 10);
            }
        });

    }

}
function initialize() {
    var mapOptions = {
        zoom: default_zoom,
        center: new google.maps.LatLng(default_lat,default_long)
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var storesList = getStoresList();
    setMarkers(storesList);
}
function getStoresList() {
    var stores = [];
    $('div.store-element').each(function(i,elem) {
        if($(this).is(":visible")) {
            stores.push([$(this).attr("data-title"), $(this).attr("data-lat"), $(this).attr("data-long"), $(this).attr("data-address"), $(this).attr("data-address_2")]);
        }
    });

    return stores;
}

function showThisLocationOnMap(lat, long) {
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(lat,long)
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var storesList = getStoresList();
    setMarkers(storesList);
}

function searchLocationByRadius(element_lat, element_long, radius) {
    $('.store-element').each(function (index) {
        var lat = $(this).data('lat');
        var long = $(this).data('long');
        var res_distance = calcDistance(element_lat, element_long,lat, long);
        res_distance = res_distance/1000;
        if(res_distance <= radius && res_distance > 0){
            $(this).show();
            $(this).children().show();
        }
    });

    setTimeout(function(){
        reloadMarkers();
    },500);
}

function calcDistance (fromLat, fromLng, toLat, toLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
}


function csvToArray(str, delimiter = ",") {

    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {

            //console.log(index);
            if(values[index]) {
                values[index] = values[index].replace('\"', '').trim();
            }
            object[index] = values[index];
            return object;

        }, {});
        return el;
    });

    return arr;
}
