// eslint-disable @typescript-eslint/no-use-before-define
import { Component } from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "86431f469c6e0015d1f975f10697cf83";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export class CityWeather extends Component<CityWeatherProps, CityWeatherState> {
  public constructor(props: CityWeatherProps) {
    super(props);
    this.state = {
      weatherResult: null
    };
  }

  public componentDidMount() {
    const { city } = this.props;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => this.setState({ weatherResult: result }))
      .catch((err) => console.error(err));
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {KtoF(weatherResult?.main.temp).toFixed(0)} &#8457;
        </div>
        <div>Descripiton: {weatherResult?.weather[0].description}</div>
      </div>
    );
  }
}
