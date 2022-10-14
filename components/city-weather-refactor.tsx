// eslint-disable @typescript-eslint/no-use-before-define
import React, { useState, useEffect, ReactElement } from "react";

// types
import {
  CityWeatherProps,
  CityWeatherState
} from "../types/city-weather-refactor.d";

// to get api key: https://openweathermap.org/appid
const API_KEY = "86431f469c6e0015d1f975f10697cf83";

export function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

export const CityWeatherRefactor = ({
  city
}: CityWeatherProps): ReactElement => {
  // CityWeatherState
  const [weatherResult, setWeatherResult] = useState<CityWeatherState>(
    {} as CityWeatherState
  );

  const [serverError, setServerError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function httpCall() {
      setLoading((loading) => true);
      setServerError((s) => false);
      try {
        const request = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const requestJsonParsed = await request.json();
        console.log(requestJsonParsed);
        setWeatherResult(requestJsonParsed);
        setLoading((loading) => false);
      } catch (error) {
        setServerError((s) => true);
        setLoading((loading) => false);
      }
    }
    httpCall();
  }, [city]);

  if (loading) {
    return (
      <div data-testid="loading" aria-live="polite">
        Loading...
      </div>
    );
  }

  if (serverError) {
    return (
      <div data-testid="error" aria-live="polite">
        Received an error from Weather API, please try back later
      </div>
    );
  }

  if (weatherResult.cod === "404") {
    return (
      <div data-testid="cityDoesNotExist" aria-live="polite">
        The city you're looking for might not exist?
      </div>
    );
  }

  return (
    <div
      data-testid="ariaAlert"
      role="alert"
      className="bg-white h-56 w-44 rounded-lg"
    >
      <h1
        aria-live="polite"
        className="flex justify-center pt-4 h-12 text-2xl font-bold text-gray-500 uppercase"
      >
        {city}
      </h1>
      <div className="mt-4 grid grid-rows-2 justify-items-center items-center text-gray-400 h-28">
        <img
          aria-live="polite"
          className="h-24 w-24"
          src={`http://openweathermap.org/img/wn/${weatherResult?.weather?.[0]?.icon}@2x.png`}
          alt="Current weather conditions in the city you're searching"
        />
        <span
          data-testid="weather"
          aria-live="polite"
          className="text-lg capitalize font-sans tracking-tighter"
        >
          {weatherResult?.weather?.[0].description}
        </span>
      </div>
      <div className="-mt-2">
        <span className="ml-4 text-sm text-gray-400 tracking-tighter">
          Temperature:
        </span>
        <span
          data-testid="temperature"
          aria-live="polite"
          className="ml-2 text-3xl mr-2 tracking-tighter font-medium"
        >
          {KtoF(weatherResult.main?.temp).toFixed(0)} &#8457;
        </span>
      </div>
    </div>
  );
};
