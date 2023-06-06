// Add functionality to the add button and individual delete buttons
// const auth = require('../../middlewares/auth');
// const StreetVendor = require('../../models/vendors');
// const Streetvendor = require('../../models/vendors')
var addButton = document.getElementById('add-button');
var menuSection = document.getElementById('menu-section');

addButton.addEventListener('click', function() {
  var newItem = document.createElement('div');
  newItem.className = 'menu-item';
  newItem.innerHTML = `
    <div class="dish-details">
      <h3>New Dish</h3>
      <p>Description of New Dish</p>
    </div>
    <div class="dish-info">
      <p class="dish-price">$0.00</p>
      <img src="dish-placeholder.jpg" alt="New Dish">
      <button class="delete-button">Delete</button>
    </div>
  `;

  newItem.querySelector('.delete-button').addEventListener('click', function() {
    newItem.remove();
  });

  menuSection.insertBefore(newItem, addButton.parentNode);
});

var deleteButtons = document.getElementsByClassName('delete-button');

for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', function() {
    this.parentNode.parentNode.remove();
  });
}
// Add functionality to the location button
var locationButton = document.getElementById('location-button');

locationButton.addEventListener('click', function() {
  // Get user's location using Geolocation API
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Create Google Maps iframe with user's location
    var mapIframe = document.createElement('iframe');
    mapIframe.src = 'https://maps.google.com/maps?q=' + lat + ',' + lon + '&z=15&output=embed';
    mapIframe.width = '100%';
    mapIframe.height = '400';
    mapIframe.frameborder = '0';

    // Clear previous iframe, if any
    var previousMapIframe = document.getElementById('map-iframe');
    if (previousMapIframe) {
      previousMapIframe.remove();
    }

    // Append the new iframe to the vendor section
    var vendorSection = document.getElementById('vendor-section');
    vendorSection.appendChild(mapIframe);

    // Send latitude and longitude to server-side API
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/vendors/updateLocation', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Location updated successfully');
      }
    };
    xhr.send(JSON.stringify({ latitude: lat, longitude: lon }));
  }, function(error) {
    console.log('Error getting user location:', error);
  });
});
