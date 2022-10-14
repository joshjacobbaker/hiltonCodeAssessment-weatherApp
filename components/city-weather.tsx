/* eslint-disable @typescript-eslint/no-use-before-define */
import { Component } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "90e450a4996778f8bb2bd339c6f51ef7";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

export class CityWeather extends Component<CityWeatherProps, CityWeatherState> {
  public constructor(props) {
    super(props);
    this.state = {
      weatherResult: null
    };
  }

  // Fetch weather data from API
  getWeather() {
    const { city } = this.props;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => this.setState({ weatherResult: result }));
  }

  public componentDidMount() {
    this.getWeather();
  }

  // Allow for new weather search
  public componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getWeather();
    }
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    // Status of the fetched weather data object
    // Used to validate and conditionally render relevant data or messages
    let fetchStatus = "";
    if (!weatherResult) {
      fetchStatus = "loading";
    } else if (weatherResult.cod === 200) {
      fetchStatus = "ok";
    } else {
      fetchStatus = "bad";
    }

    return (
      <div>
        {/* Prefer city name from API over user entry */}
        <h1>{fetchStatus === "ok" ? weatherResult.name : city}</h1>
        <div>
          {fetchStatus === "ok" ? (
            <div>
              <div>
                Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
              </div>
              <div>Descripiton: {weatherResult.weather[0].description}</div>
            </div>
          ) : fetchStatus === "bad" ? (
            "No weather found."
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    );
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
