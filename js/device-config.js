// put the corresponding api and public channel in the array
var devices_arr = [
  {
    device_name: "Ones",
    api_url:
      "https://api.thingspeak.com/channels/1647842/feeds.json?results=1",
    api_panic:
      "https://api.thingspeak.com/channels/1662283/feeds.json?results=1",
    history_url: "https://thingspeak.com/channels/1647842",
    active: false,
    id: 1,
  },
  {
    device_name: "Richard",
    api_url:
      "https://api.thingspeak.com/channels/1698018/feeds.json?results=1",
    api_panic:
      "https://api.thingspeak.com/channels/1698019/feeds.json?results=1",
    history_url: "https://thingspeak.com/channels/1698018",
    active: false,
    id: 2,
  },
  {
    device_name: "Dheannies",
    api_url:
      "https://api.thingspeak.com/channels/1686022/feeds.json?results=1",
    api_panic:
      "https://api.thingspeak.com/channels/1686026/feeds.json?results=1",
    history_url: "https://thingspeak.com/channels/1686022",
    active: false,
    id: 3,
  },
  // {
  //   device_name: "Eja",
  //   api_url:
  //     "https://api.thingspeak.com/channels/1699482/feeds.json?results=1",
  //   api_panic:
  //     "https://api.thingspeak.com/channels/1699484/feeds.json?results=1",
  //   history_url: "https://thingspeak.com/channels/1699482",
  //   active: false,
  //   id: 4,
  // },
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

// Area settings
var circleOption = {
  color: "green",
  fillColor: "#007820",
  fillOpacity: 0.3,
  radius: 200, //in meters
};

// Params Setting [MIN, MAX], set to null for no params
const TEMP_PARAMS = [null, 37.5];
const SPO2_PARAMS = [95, 100];
const HR_PARAMS = [60, 120];

// Time Setting (seconds)
const REFRESH_TIME = 1;
const INACTIVITY_DURATION = 60;
const NOTIFICATION_STALE_DURATION = 60;
const PANIC_DURATION = 60

// CONTENT RESOURCE
const PARAMS_MSG = "Parameter di luar limit!";
const PANIC_MSG = "Panic Button ditekan!"

// POP NOTIFICATION COLOR
const PANIC_NOTIF_COLOR = "#ff8c00"
const PARAMS_NOTIF_COLOR = "#d42f26"