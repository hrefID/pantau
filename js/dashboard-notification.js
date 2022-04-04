function popNotification(currentDate, deviceName, message, data, id) {
  var newDiv = document.createElement("div");
  newDiv.className = "notification";
  var crossElement = document.createElement("a");
  var leftCross = document.createElement("div");
  var rightCross = document.createElement("div");

  crossElement.setAttribute("href", "#");
  crossElement.className = "cross";
  leftCross.className = "left-cross";
  rightCross.className = "right-cross";

  crossElement.appendChild(leftCross);
  crossElement.appendChild(rightCross);
  newDiv.appendChild(crossElement);

  newDiv
    .appendChild(document.createElement("h5"))
    .appendChild(
      document.createTextNode(id)
    );
  newDiv
    .appendChild(document.createElement("h3"))
    .appendChild(
      document.createTextNode(`Warning on ${deviceName || "undefined"}!`)
    );
  newDiv
    .appendChild(document.createElement("h4"))
    .appendChild(document.createTextNode(message));
  newDiv
    .appendChild(document.createElement("p"))
    .appendChild(
      document.createTextNode(
        `Temp: ${data.field3 || "null"} | SO2: ${
          data.field1 || "null"
        } | Heartbeat: ${data.field2 || "null"}`
      )
    );
  newDiv
    .appendChild(document.createElement("p"))
    .appendChild(
      document.createTextNode(
        `Longitude: ${data.field6 || "null"} | Latitude: ${
          data.field5 || "null"
        }`
      )
    );

  newDiv
    .appendChild(document.createElement("p"))
    .appendChild(
      document.createTextNode(
        `${timeFormat(currentDate.getHours())} : ${timeFormat(
          currentDate.getMinutes()
        )} : ${timeFormat(
          currentDate.getSeconds()
        )} - ${currentDate.getDate()} ${
          monthNames[currentDate.getMonth()]
        } ${currentDate.getFullYear()} `
      )
    );
  newDiv
    .querySelectorAll("p")
    [newDiv.querySelectorAll("p").length - 1].classList.add("date");

  var notificationsDiv = document.querySelector(".notifications");
  notificationsDiv.querySelectorAll("div").length === 0
    ? notificationsDiv.insertBefore(newDiv, notificationsDiv.lastChild)
    : notificationsDiv.insertBefore(
        newDiv,
        notificationsDiv.lastChild.nextSibling
      );
      
  document.getElementById("notificationAudio").pause();
  document.getElementById("notificationAudio").currentTime = 0;
  document.getElementById("notificationAudio").play();

  document.querySelectorAll(".cross").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      removeNotification(a)
      document.getElementById("notificationAudio").pause();
      document.getElementById("notificationAudio").currentTime = 0;
    });
  });
}

var removeNotification = (a) => {
  var id = parseInt(a.parentElement.querySelector('h5').innerHTML)
  var indexID = devices_arr.map(device => device.id).indexOf(id)
  marker_bool[indexID].notif = false;
  devices_arr[indexID].active ? marker_bool[indexID].notifCount = 0 : marker_bool[indexID].notifCount = NOTIFICATION_STALE_DURATION;
  a.parentElement.remove();
}

// popup notification on history device 0 click
// document
//   .querySelectorAll(".person-history")[0]
//   .addEventListener("click", (e) => {
//     e.preventDefault();
//     document.getElementById("notificationAudio").pause();
//     document.getElementById("notificationAudio").currentTime = 0;
//     popNotification(
//       new Date(),
//       "Device 3",
//       "Parameter di luar limit!",
//       40,
//       40,
//       40,
//       -23.6,
//       60.3
//     );
//   });
