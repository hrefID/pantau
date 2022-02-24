var name = localStorage.getItem("username");

document.querySelector('.login').addEventListener('click', (e)=>{
  e.preventDefault();
  localStorage.removeItem('username');
  window.location.href = '/login.html';
})

document.addEventListener('DOMContentLoaded', ()=>{
  if (name == '' || name == 'null'){
    alert('You need to login to access this page!');
    window.location.href = '/login.html';
  } else{
    document.querySelector('.username-placeholder').innerHTML = name;
  }
  
  document.querySelector('.toolbar-toggle').querySelector('a').addEventListener('click', ()=>{
    document.querySelector('.toolbar').classList.toggle('toolbar-active');
    if (document.querySelector('.toolbar').classList.contains('toolbar-active')){
      document.querySelector('.toolbar-toggle').querySelector('path').attributes.d.value = "M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z";
    } else {
      document.querySelector('.toolbar-toggle').querySelector('path').attributes.d.value = "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z";
    }
  })
})    

// Map Settings
var map = L.map('map-db').setView([-6.362480397433, 106.82404411061857], 16);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=vPVqdMuRowKnXesdqmzl', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

// Marker Settings
var markerIcon = L.Icon.extend({
    options: {
      shadowUrl: 'css/images/marker-shadow.png',

      iconSize:     [40, 40], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
      shadowAnchor: [12, 39],  // the same for the shadow
      popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
    }
});

var greenIcon = new markerIcon({iconUrl: 'css/images/marker-green.png'}),
redIcon = new markerIcon({iconUrl: 'css/images/marker-red.png'}),
yellowIcon = new markerIcon({iconUrl: 'css/images/marker-yellow.png'});

// Area settings
var circle = L.circle([-6.362480397433, 106.82404411061857], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: 200
}).addTo(map);

// Markers Configuration
var marker_1 = L.marker([-6.362, 106.824], {icon: greenIcon}).addTo(map);
var marker_2 = L.marker([-6.363, 106.827], {icon: greenIcon}).addTo(map)
var marker_3 = L.marker([-6.366, 106.825], {icon: greenIcon}).addTo(map)
var marker_4 = L.marker([-6.367, 106.824], {icon: greenIcon}).addTo(map)

var marker_arr = [marker_1, marker_2, marker_3, marker_4]
var data_arr = [];
var api_url = [
  'https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=2', 
  'https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=2', 
];


function updateMarker(){
  api_url.forEach((url, i) => {
    data_arr[i] = JSON.parse(Get(url));
    var feeds_arr = data_arr[i].feeds
    data_arr[i] = feeds_arr[feeds_arr.length - 1]
  })

  // console.log(data_arr);

  data_arr.forEach((el, i) => {
    // Set the status
    var personStatus = document.querySelector(`.person-`+(i+1))
    personStatus.querySelector('.person-suhu').innerHTML = el.field3 ? el.field3 : 'null' ;
    personStatus.querySelector('.person-spo2').innerHTML = el.field1 ? el.field1 : 'null' ;
    personStatus.querySelector('.person-hr').innerHTML = el.field2 ? el.field2 : 'null'  ;

    //Set the marker position
    //marker_arr[i].setLatLng

    //Set panic button
  })

  //Set marker popup
  marker_arr.forEach((marker, i) => {
    marker.bindPopup(`<b class='bold'>Device ` + (i+1) + `</b><br>Longitude: ` + marker.getLatLng().lat + `<br>Altitude: ` + marker.getLatLng().lng);
  })
}

updateMarker();
setInterval(updateMarker, 2000);

// setTimeout(() =>{
//   marker_1.setLatLng([-6.360, 106.824])
//   marker_1.setIcon(yellowIcon)
//   updateMarker(marker_arr);
// }, 2000)

// var channel_1 = JSON.parse(Get('https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=2'));
// console.dir(channel_1);
// console.log(channel_1.feeds[channel_1.feeds.length-1].field1);

