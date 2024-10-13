export interface WeatherData {
	precipitation: number;
	relativeHumidity: number;
	windSpeed: number;
	windDirection: number;
	currentTemperature: number;
	temperatureForecast: { time: string; temperature: number }[];
	precipitationForecast: { time: string; precipitation: number }[];
	humidityForecast: { time: string; humidity: number }[];
	windSpeedForecast: { time: string; windSpeed: number }[];
}

export interface Forecast {
	time: string; // Time in a readable format
	weather: {
		main: string;
		description: string;
		icon: string;
	};
	temp: {
		c: string;
		f: string;
	};
}

export interface WeatherResponse {
	name: string;
	weatherDesc: string;
	icon: string;
	temp: {
		c: string;
		f: string;
	};
	max: {
		c: string;
		f: string;
	};
	min: {
		c: string;
		f: string;
	};
	forecast: Forecast[];
	sunrise: string; // Sunrise time
}
