const weatherForm = document.getElementById('weatherForm');
        const cityInput = document.getElementById('cityInput');
        const weatherInfo = document.getElementById('weatherInfo');

        weatherForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const city = cityInput.value;

            const apiKey = '58a434b770c06138465c1be16f832b0d';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === 200) {
                        const weather = data.weather[0];
                        const temperature = (data.main.temp - 273.15).toFixed(2);
                        const condition = weather.description;

                        weatherInfo.innerHTML = `
                            <h2>Weather in ${city}</h2>
                            <p>Temperature: ${temperature}°C</p>
                            <p>Condition: ${condition}</p>
                        `;
                        //change background on different weather
                        if (condition === 'clear sky') {
                            document.body.style.backgroundImage = 'url("clear_sky.jpg")';
                        }
                        else if (condition === 'few clouds') {
                            document.body.style.backgroundImage = 'url("few_clouds.jpg")';
                        }
                        else if (condition === 'scattered clouds') {
                            document.body.style.backgroundImage = 'url("scattered_clouds.jpg")';
                        }
                        else if (condition === 'haze') {
                            document.body.style.backgroundImage = 'url("haze.jpg")';
                        }
                        else if (condition === 'light rain') {
                            document.body.style.backgroundImage = 'url("light_rain.jpg")';
                        }
                        else if (condition === 'moderate rain') {
                            document.body.style.backgroundImage = 'url("moderate_rain.jpg")';
                        }

                    } else {
                        weatherInfo.innerHTML = `<p>${data.message}</p>`;
                    }
                })
                .catch(error => {
                    console.log('Error:', error);
                    weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
                });
        });