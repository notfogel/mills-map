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

function getData(){

    fetch("data/mills-example-places.geojson") 
    .then(function(response){
        return response.json();
})
    .then(function(json){
        L.geoJSON(json),addTo(map);
        //doin some attribute stuff with arrays or something
        //var attributes = processData(json);
        //console.log(attributes);
    })
};











document.addEventListener('DOMContentLoaded',createMap)
