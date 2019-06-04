import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// $(document).ready(function() {
//     $('#weatherLocation').click(function() {
//       let city = $('#location').val();
//       $('#location').val("");
//       $.ajax({
//         // url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6f4f57f14f2c2b46bc1647f493fb438d`,
//         url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`,
//         type: 'GET',
//         data: {
//           format: 'json'
//         },
//         success: function(response) {
//           $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//           $('.showTemp').text(`The temperature is ${response.main.temp} F.`);
//         },
//         error: function() {
//           $('#errors').text("There was an error processing your request. Please try again.");
//         }
//       });
//     });
//   });

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }
    request.open("GET", url, true);
    request.send();
    
    const getElements = function(response) {
      let temp = Math.round(response.main.temp);
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${temp} F.`);
    }
  });
});