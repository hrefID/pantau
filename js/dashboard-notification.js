function popNotification(deviceName, message, temp, so2, heart, lng, lat) {
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
  newDiv.appendChild(crossElement)

  newDiv
    .appendChild(document.createElement("h3"))
    .appendChild(document.createTextNode(`Warning on ${deviceName}!`));
  newDiv
    .appendChild(document.createElement("h4"))
    .appendChild(document.createTextNode(message));
  newDiv
    .appendChild(document.createElement("p"))
    .appendChild(
      document.createTextNode(
        `Temp: ${temp} | SO2: ${so2} | Heartbeat: ${heart}`
      )
    );
  newDiv
    .appendChild(document.createElement("p"))
    .appendChild(
      document.createTextNode(`Longitude: ${lng} | Latitude: ${lat}`)
    );

  var notificationsDiv = document.querySelector(".notifications");
  notificationsDiv.insertBefore(newDiv, notificationsDiv.lastChild);
  document.getElementById("notificationAudio").play();

  document.querySelectorAll(".cross").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      a.parentElement.remove();
      document.getElementById("notificationAudio").pause();
      document.getElementById("notificationAudio").currentTime = 0;
    });
  });
}

// popup notification on history device 0 click
document
  .querySelectorAll(".person-history")[0]
  .addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("notificationAudio").pause();
    document.getElementById("notificationAudio").currentTime = 0;
    popNotification(
      "Device 3",
      "The heartbeat is too low!",
      40,
      40,
      40,
      -23.6,
      60.3
    );
  });
