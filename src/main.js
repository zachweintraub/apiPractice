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


function populateDropdowns() {
  let request = new XMLHttpRequest();
  const url = `https://api.exchangerate-api.com/v4/latest/USD`;

  request.open("GET", url, true);
  request.send();
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      for (let key in response.rates) {
        if (key != "USD") {
          $('#fromCurrency').append(`<option>${key}</option>`);
        }
      }
      for (let key in response.rates) {
        if (key != "EUR") {
          $('#toCurrency').append(`<option>${key}</option>`);
        }
      }
    }
  }
}

function convert(amount, currencyOne, currencyTwo) {
  $('#currencyResult').empty();
  let request = new XMLHttpRequest();
  const url = `https://api.exchangerate-api.com/v4/latest/${currencyOne}`;
  let result = 0;

  request.open("GET", url, true);
  request.send();
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      result = (amount * response.rates[currencyTwo]).toFixed(2);
      $('#currencyResult').append(`<p>${result}</p>`);
    }
  }
}

$(document).ready(function() {
  //weather logic
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
  //currency logic
  populateDropdowns();
  $('#fromAmount').keyup(function() {
    if ($('#currencyInput').val() != "") {
      convert($('#fromAmount').val(), $('#fromCurrency').val(), $('#toCurrency').val());
    }
  });
  $('#fromCurrency').change(function() {
    convert($('#fromAmount').val(), $('#fromCurrency').val(), $('#toCurrency').val());
  });
  $('#toCurrency').change(function() {
    convert($('#fromAmount').val(), $('#fromCurrency').val(), $('#toCurrency').val());
  });

});