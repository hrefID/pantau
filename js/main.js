document.querySelector('.hamburger').addEventListener('click', () =>{
  document.querySelector('.menus').classList.toggle('show-menu');
})

function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;          
}