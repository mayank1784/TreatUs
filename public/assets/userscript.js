//user page
// Add functionality to the location button

var locationButton = document.getElementById('location-button');
var locationHeading = document.getElementById('location-heading');

locationButton.addEventListener('click', function() {
  // Get user's current location using Geolocation API
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Set the latitude and longitude as the content of the location heading
    locationHeading.textContent = 'Latitude: ' + latitude + ' | Longitude: ' + longitude;
  }, function(error) {
    console.log('Error getting user location:', error);
  });
});
/* Add functionality to the location button
var locationButton = document.getElementById('location-button');
var locationHeading = document.getElementById('location-heading');

locationButton.addEventListener('click', function() {
  // Get user's current location using Geolocation API
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Make an HTTP request to the API endpoint
    var apiUrl = 'https://geocode.maps.co/reverse?lat=' + latitude + '&lon=' + longitude;
    fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
          return response.json();
          console.log(response);
          
        } else {
          throw new Error('Error:', response.status);
        }
      })
      .then(function(data) {
        var locationName = data.address;
        
        // Set the location name as the content of the location heading
        locationHeading.textContent = 'Location: ' + locationName;
      })
      .catch(function(error) {
        console.log('Error getting location:', error);
      });
  }, function(error) {
    console.log('Error getting user location:', error);
  });
});
*/
