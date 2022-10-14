// eslint-disable @typescript-eslint/no-use-before-define
import React, { useState, useEffect, ReactElement } from "react";

// types
import {
  CityWeatherProps,
  CityWeatherState
} from "../types/city-weather-refactor.d";

// to get api key: https://openweathermap.org/appid
const API_KEY = "86431f469c6e0015d1f975f10697cf83";

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export const CityWeatherRefactor = ({
  city
}: CityWeatherProps): ReactElement => {
  const [weatherResult, setWeatherResult] = useState<CityWeatherState>(null);

  useEffect(() => {
    async function httpCall() {
      try {
        const request = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const requestJsonParsed = await request.json();
        console.log(requestJsonParsed);
        setWeatherResult(requestJsonParsed);
      } catch (error) {
        console.error(error);
      }
    }
    httpCall();
  }, [city]);

  return (
    <div>
      <h1>{city}</h1>
      <div>
        Temperature: {KtoF(weatherResult?.main?.temp).toFixed(0)} &#8457;
      </div>
      <div>Descripiton: {weatherResult?.weather?.[0]?.description}</div>
    </div>
  );
};
