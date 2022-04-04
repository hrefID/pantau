var name = localStorage.getItem("username");

document.querySelector(".login").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("username");
  window.location.href = "/login.html";
});

function createPerson() {
  var newPersonDiv = document
    .querySelector("#person-template")
    .content.querySelector("div")
    .cloneNode(true);
  var peopleDiv = document.querySelector(".people-status");
  peopleDiv.insertBefore(newPersonDiv, peopleDiv.lastChild);
}
devices_arr.forEach(createPerson);

document.addEventListener("DOMContentLoaded", () => {
  if (name == "" || name == "null") {
    alert("You need to login to access this page!");
    window.location.href = "/login.html";
  } else {
    document.querySelector(".username-placeholder").innerHTML = name;
  }

  document
    .querySelector(".toolbar-toggle")
    .querySelector("a")
    .addEventListener("click", () => {
      document.querySelector(".toolbar").classList.toggle("toolbar-active");
      if (
        document.querySelector(".toolbar").classList.contains("toolbar-active")
      ) {
        document
          .querySelector(".toolbar-toggle")
          .querySelector("path").attributes.d.value =
          "M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z";
      } else {
        document
          .querySelector(".toolbar-toggle")
          .querySelector("path").attributes.d.value =
          "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z";
      }
    });
});

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "July",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

var timeFormat = (number) => {
  if (number < 10) return `0${number}`
  else return number
}

function updateTime() {
  var dateText = document.querySelector(".date-time").querySelector(".date");
  var timeText = document.querySelector(".date-time").querySelector(".time");
  var currentDate = new Date();
  dateText.innerHTML = `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  timeText.innerHTML = `${timeFormat(currentDate.getHours())} : ${timeFormat(currentDate.getMinutes())} : ${timeFormat(currentDate.getSeconds())}`;
}
