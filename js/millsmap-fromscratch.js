var map;
function createMap(){
    //the creation of map
    map = L.map('map', {
        center: [44.6344,-89.70972],
        zoom: 6
    });
    //adding OSM tilelayerrrrr
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    
    //call the uh, getData fxn
    getData(map);
};

function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

function getData(){
    //load that data!!!
    fetch("data/mills-example-try2.geojson") 
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
    
            //(in theory) create a geoJSON layer and add it to the map
            L.geoJSON(json, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },        
                onEachFeature: onEachFeature
    
            }).addTo(map);
        //doin some attribute stuff with arrays or something
        //var attributes = processData(json);
        //console.log(attributes);
    })
};

document.addEventListener('DOMContentLoaded',createMap)
