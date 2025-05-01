let ip, map, mapMarker;
getIP();
attachHandleIPForm();

// below are all function till the end of file.
function attachHandleIPForm() {
  document
    .querySelector("form.ip-form")
    .addEventListener("submit", handleIPForm);
}
function handleIPForm(e) {
  e.preventDefault();
  const submittedIP = e.target.ip.value;
  ip = submittedIP;
  getIPGeolocation(ip);
}
async function getIP() {
  const apiURL = "https://api.ipify.org";
  const response = await fetch(apiURL);
  if (!response.ok) {
    console.log("Cannot get IP...");
    return;
  }
  ip = await response.text();
  handleIP(ip);
}
function handleIP(ip) {
  document.querySelector("input[name='ip']").value = ip;
  getIPGeolocation(ip);
}
async function getIPGeolocation(ip) {
  const ipV4Reg = /^(\d+\.\d+\.\d+\.\d+)$/;
  if (!ipV4Reg.test(ip)) {
    console.log(`ip: "${ip}" is not a valid IPV4 address.`);
    return;
  }
  const apiURL = "https://geo.ipify.org/api/v2/country,city";
  const getURL = `${apiURL}?apiKey=at_KIiGTofnAftborPmxbJUWmgWaD2Pi&ipAddress=${ip}`;
  const response = await fetch(getURL);
  if (!response.ok) {
    console.log("Cannot get ip geolocation...");
    return;
  }
  const apiOutput = await response.json();
  renderIPGeolocation(apiOutput);
}
function renderIPGeolocation(apiOutput) {
  const {
    ip,
    location: { country, city, lat, lng, postalCode, region, timezone },
    isp,
  } = apiOutput;
  renderTextContentByid("ip-address", ip);
  renderTextContentByid("ip-location", `${city} ${postalCode}, ${region}`);
  renderTextContentByid("ip-timezone", timezone);
  renderTextContentByid("ip-isp", isp);
  renderMap([lat, lng]);
}
function renderTextContentByid(id, textContent) {
  document.getElementById(id).textContent = textContent;
}
function renderMap([lat, lng], zoomLevel = 10) {
  if (map) {
    map.panTo([lat, lng]);
    map.setZoom(zoomLevel);
    renderMapMarker([lat, lng]);
    return;
  }
  map = L.map("map").setView([lat, lng], zoomLevel);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  renderMapMarker([lat, lng]);
}
function renderMapMarker([lat, lng], iconURL = "./images/icon-location.svg") {
  const markerIcon = L.icon({
    iconUrl: iconURL,
  });
  if (mapMarker) {
    mapMarker.remove();
  }
  mapMarker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}
