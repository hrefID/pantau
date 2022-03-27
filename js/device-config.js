// put the corresponding api and public channel in the array
var devices_arr = [
  {
    device_name: "Elian Richard",
    api_url:
      "https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=1",
    api_panic:
      "https://api.thingspeak.com/channels/1662283/feeds.json?api_key=D8HQD2OAKS3BFQ5C&results=1",
    history_url: "https://thingspeak.com/channels/1647842",
    active: false,
  },
  {
    device_name: "Alvin Filipi",
    api_url:
      "https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=1",
    api_panic:
      "https://api.thingspeak.com/channels/1662283/feeds.json?api_key=D8HQD2OAKS3BFQ5C&results=1",
    history_url: "https://thingspeak.com/channels/1647842",
    active: false,
  },
  {
    device_name: "Joe Biden",
    api_url:
      "https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=1",
    api_panic:
      "https://api.thingspeak.com/channels/1662283/feeds.json?api_key=D8HQD2OAKS3BFQ5C&results=1",
    history_url: "https://thingspeak.com/channels/1647842",
    active: false,
  },
  {
    device_name: "Joe Biden2",
    api_url:
      "https://api.thingspeak.com/channels/1647842/feeds.json?api_key=BG370R10VM3PR7BC&results=1",
    api_panic:
      "https://api.thingspeak.com/channels/1662283/feeds.json?api_key=D8HQD2OAKS3BFQ5C&results=1",
    history_url: "https://thingspeak.com/channels/1647842",
    active: false,
  },
];

// Marker Settings
var markerIcon = L.Icon.extend({
  options: {
    shadowUrl: "css/images/marker-shadow.png",

    iconSize: [40, 40], // size of the icon
    shadowSize: [41, 41], // size of the shadow
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 39], // the same for the shadow
    popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
  },
});

var greenIcon = new markerIcon({ iconUrl: "css/images/marker-green.png" }),
  redIcon = new markerIcon({ iconUrl: "css/images/marker-red.png" }),
  yellowIcon = new markerIcon({ iconUrl: "css/images/marker-yellow.png" }),
  blueIcon = new markerIcon({ iconUrl: "css/images/marker-blue.png" }),
  blackIcon = new markerIcon({ iconUrl: "css/images/marker-black.png" }),
  orangeIcon = new markerIcon({ iconUrl: "css/images/marker-orange.png" });

// Markers for Development Purposes
var marker_1 = L.marker([-6.36, 106.824], { icon: blueIcon });
var marker_2 = L.marker([-6.363, 106.823], { icon: blueIcon });
var marker_3 = L.marker([-6.366, 106.825], { icon: blueIcon });
var marker_4 = L.marker([-6.367, 106.824], { icon: blueIcon });
var marker_arr = [marker_1, marker_2, marker_3, marker_4];

// Area settings
var circleOption = {
  color: "green",
  fillColor: "#007820",
  fillOpacity: 0.3,
  radius: 200,
}

var circleOne = L.circle([-6.36, 106.824], new Object(circleOption))
var circleTwo = L.circle([-6.36, 106.824], new Object(circleOption))
var circleThree = L.circle([-6.36, 106.824], new Object(circleOption))
var circleFour = L.circle([-6.36, 106.824], new Object(circleOption))
var circle_arr = [circleOne, circleTwo, circleThree, circleFour]