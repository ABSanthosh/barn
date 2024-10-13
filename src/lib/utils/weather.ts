import { OPEN_WEATHER_API_KEY } from '$env/static/private';
import type { Forecast, WeatherData, WeatherResponse } from '$types/Weather.type';

const apiKey = OPEN_WEATHER_API_KEY;
export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
	const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		// Get current weather
		const currentWeather = data.list[0];
		const precipitation = currentWeather.rain ? currentWeather.rain['1h'] || 0 : 0;
		const relativeHumidity = currentWeather.main.humidity;
		const windSpeed = currentWeather.wind.speed;
		const windDirection = currentWeather.wind.deg;
		const currentTemperature = currentWeather.main.temp;

		// Prepare forecasts
		const temperatureForecast = data.list.map((entry: any) => ({
			time: entry.dt_txt,
			temperature: entry.main.temp
		}));

		const precipitationForecast = data.list.map((entry: any) => ({
			time: entry.dt_txt,
			precipitation: entry.rain ? entry.rain['1h'] || 0 : 0
		}));

		const humidityForecast = data.list.map((entry: any) => ({
			time: entry.dt_txt,
			humidity: entry.main.humidity
		}));

		const windSpeedForecast = data.list.map((entry: any) => ({
			time: entry.dt_txt,
			windSpeed: entry.wind.speed
		}));

		return {
			precipitation,
			relativeHumidity,
			windSpeed,
			windDirection,
			currentTemperature,
			temperatureForecast: temperatureForecast.slice(0, 8), // 8 entries for 24 hours (3-hour intervals)
			precipitationForecast: precipitationForecast.slice(0, 8),
			humidityForecast: humidityForecast.slice(0, 8),
			windSpeedForecast: windSpeedForecast.slice(0, 8)
		};
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw new Error('Failed to fetch weather data');
	}
}

function generateIconLink(icon: string): string {
	return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export async function getWeatherCardData(
	locations: { lat: number; lon: number }[]
): Promise<WeatherResponse[]> {
	const weatherPromises = locations.map(async ({ lat, lon }) => {
		const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=8`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch weather data for lat: ${lat}, lon: ${lon}`);
		}

		const data = await response.json();

		// Get city name and sunrise time
		const cityName = data.city.name;
		const sunriseTime = new Date(data.city.sunrise * 1000).toLocaleTimeString();

		// Get current weather details from the first forecast item
		const currentWeather = data.list[0];
		const currentTempC = currentWeather.main.temp;
		const currentTempF = (currentTempC * 9) / 5 + 32; // Convert to Fahrenheit
		const maxTempC = currentWeather.main.temp_max;
		const minTempC = currentWeather.main.temp_min;
		const weatherDesc = currentWeather.weather[0].description;

		// Prepare forecast data for the next intervals
		const forecast: Forecast[] = data.list.map((entry: any) => ({
			time: entry.dt_txt,
			weather: {
				main: entry.weather[0].main,
				description: entry.weather[0].description,
				icon: generateIconLink(entry.weather[0].icon)
			},
			temp: {
				c: `${Math.round(entry.main.temp)}°C`,
				f: `${Math.round((entry.main.temp * 9) / 5 + 32)}°F`
			}
		}));

		return {
			name: cityName,
			weatherDesc: weatherDesc,
			icon: generateIconLink(currentWeather.weather[0].icon),
			temp: { c: `${Math.round(currentTempC)}°C`, f: `${Math.round(currentTempF)}°F` },
			max: { c: `${Math.round(maxTempC)}°C`, f: `${Math.round((maxTempC * 9) / 5 + 32)}°F` },
			min: { c: `${Math.round(minTempC)}°C`, f: `${Math.round((minTempC * 9) / 5 + 32)}°F` },
			forecast: forecast,
			sunrise: sunriseTime
		};
	});

	return Promise.all(weatherPromises);
}
