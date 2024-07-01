import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeatherData = async () => {
        setLoading(true);
        setError('');
        setWeatherData(null);
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=79d64db3016f40c3bfe181640240107&q=${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (city.trim() !== '') {
            fetchWeatherData();
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city name" />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading data…</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <p>Temperature: {weatherData.current.temp_c} °C</p>
                        <p>Humidity: {weatherData.current.humidity} %</p>
                        <p>Condition: {weatherData.current.condition.text}</p>
                        <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather