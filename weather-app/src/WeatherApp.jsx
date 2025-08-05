import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('weather.jpg'); // ✅ default background
  const [error, setError] = useState('');

  const API_KEY = 'd0b56f5645a4f62adca4cb8fd3306358';

  const handleGetWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const description = response.data.weather[0].description.toLowerCase();

      if (description.includes('cloud')) {
        setBackground('cloudy.jpg');
      } else if (description.includes('rain') || description.includes('drizzle')) {
        setBackground('rainy.jpg');
      } else if (description.includes('clear') || description.includes('sunny')) {
        setBackground('summer.jpg');
      } else if (description.includes('snow') || description.includes('sleet')) {
        setBackground('snow.jpg');
      } else {
        setBackground('weather.jpg');
      }

      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  // ✅ Always apply background (including default on first load)
  useEffect(() => {
    document.body.style.backgroundImage = `url(/${background})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.transition = 'background-image 0.5s ease-in-out';
  }, [background]);

  return (
    <div className="weather-overlay">
      <div className="weather-box">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleGetWeather}>Get Weather</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p className="description">{weatherData.weather[0].description}</p>
            <p className="temperature">🌡️ {weatherData.main.temp}°C</p>
            <p className="humidity">💧 Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
