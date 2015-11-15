var map;

function init() {
    var saoPaulo = new google.maps.LatLng(-23.533, -46.616);

    map = new google.maps.Map(document.getElementById('map'), {
        center: saoPaulo,
        zoom: 8
    });

    initPolygon();
}

function setMarkerListener(marker){
    var that = this;
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    var contentString = "<span>" + "Lat: " + lat + " lng: "+ lng + "</span>";
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
        
    marker.addListener('mouseover', function() {
        infowindow.open(that.map, marker);
        marker.infow = infowindow;
    });
    
    marker.addListener('mouseout', function() {
        marker.infow.close();
    });
}

function initPolygon(){
    var that = this;
    
    var polygonOptions = { 
        map: that.map, 
        path: [], 
        strokeColor: "#0000FF",
        fillColor: '#0000FF',
        strokeWeight: 2,
        fillOpacity: 0.35,
        strokeOpacity: 0.8 }
        
    var polygon = new google.maps.Polygon(polygonOptions);
    
    google.maps.event.addListener(that.map, 'click', function (event) {
        console.log("Target");
        var currentPath = polygon.getPath();
        currentPath.push(event.latLng);
        
        var marker = new google.maps.Marker({ map: that.map, position: event.latLng, draggable: true});
        setMarkerListener(marker);
    });
}

window.onload = init;