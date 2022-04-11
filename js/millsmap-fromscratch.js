var map;
var catalogData;
function createMap(){
    //the creation of map
    map = L.map('map', {
        center: [44.6344,-89.70972],
        zoom: 6.8,
        zoomSnap: 0.1
        
    });
    //adding OSM tilelayerrrrr
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	minZoom: 6,
    maxZoom: 13,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    
    //call the uh, getData fxn
    getData(map);
};

//I just want a title!!!!
function createTitle(){
    L.Control.textbox = L.Control.extend({
		onAdd: function(map) {
			
		var title = L.DomUtil.create('div');
		title.id = "my_title";
		title.innerHTML = "<strong>Wisconsin Folksong Collection, 1937-1946  <br> by Sammy Fogel</strong>"
        
		return title;
		},
        
		onRemove: function(map) {
		}
	});
	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
	L.control.textbox({ position: 'bottomleft' }).addTo(map);
};

//populates info into popupcontent 
function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    var linkz = "";
    var formattedLinkz = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            if(property=="Permalink"){
                linkz += feature.properties[property];
                formattedLinkz += "<a href=" + "'" + linkz + "' target='_blank'>click here to see this in the library catalog!" + "</a>";
                //console.log(formattedLinkz)
                popupContent += "<p><strong>" + property + ":</strong> " + formattedLinkz + "</p>";                
            }else{
                popupContent += "<p><strong>" + property + ":</strong> " + feature.properties[property] + "</p>";
            }
        }
        layer.bindPopup(popupContent);
    };
};
function getData(){
    //load that data!!!
    fetch("data/mills-example-places.geojson") 
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            var geojsonMarkerOptions = {
                
                radius: 8,
                fillColor: "#6ecc39",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8 
            }; 
            createTitle();
            //(in theory) create a geoJSON layer and add it to the map
            var catalogData = L.geoJSON(json, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },        
                onEachFeature: onEachFeature 
                
            }).addTo(map);
            var markers = L.markerClusterGroup().addLayer(catalogData); //starting by declaring the clustered ones as a global var
            map.addLayer(markers);


        //doin some attribute stuff with arrays or something
        //var attributes = processData(json);
        //console.log(attributes);
    })
};


document.addEventListener('DOMContentLoaded',createMap)
