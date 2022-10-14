/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";

// const API_KEY = "3ea105e11849263d54e7804938dc120f";
const API_KEY = "90e450a4996778f8bb2bd339c6f51ef7";

function CityWeather(props: { city: string }) {
  const [weatherData, setWeatherData] = React.useState({});
  const [fetching, setFetching] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      getWeatherData(props.city);
    }
    // cleanup
    return () => {
      mounted = false;
    };
  }, [props.city]);

  function getWeatherData(city: string): void {
    setFetching(true);
    // console.log("fetch started.");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => {
        setFetching(false);
        // console.log("fetch complete.");
        // console.log(result);
        if (result.cod === 429) {
          // console.log("API limit reached!");
        }
        if (!result || result.cod !== 200) {
          setSuccess(false);
          // console.log("unsuccessful fetch.");
        } else {
          setWeatherData({
            city: result.name,
            temp: KtoF(result.main.temp).toFixed(0),
            desc: titlizeString(result.weather[0].description),
            icon: result.weather[0].icon
          });
          setSuccess(true);
          // console.log("successfully fetched weather data.");
        }
      });
  }

  // Utility functions
  function getIconUrl(code: string) {
    return `http://openweathermap.org/img/wn/${code}@2x.png`;
  }

  function KtoF(tempKevlin: number) {
    return ((tempKevlin - 273.15) * 9) / 5 + 32;
  }

  function titlizeString(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div aria-live="polite" aria-busy={fetching ? "true" : "false"}>
      {/* Loading spinner */}
      <div className={fetching ? "animate-pulse" : "hidden"}>
        <LoadingSpinner />
      </div>

      {/* No results found message */}
      <div className={!fetching && !success ? "" : "hidden"}>
        <NoResults city={props.city} />
      </div>

      {/* Main content */}
      <div className={!fetching && success ? "" : "hidden"}>
        <div className="flex flex-col items-center w-52 mx-auto p-3 pb-4 bg-white border border-slate-100 rounded-md shadow-lg">
          {/* City name */}
          <div className="text-gray-600 font-bold text-center text-2xl">
            {/* {titlizeString(props.city)} */}
            {weatherData.city}
          </div>
          {/* Weather icon */}
          <div>
            <img src={getIconUrl(weatherData.icon)} alt="Weather icon" />
          </div>
          {/* Description */}
          <div className="text-gray-400 text-lg font-medium">
            <span data-testid="weather-desc">{weatherData.desc}</span>
          </div>
          {/* Temp */}
          <div className="flex items-baseline gap-x-2 mt-2 tracking-tight font-medium">
            <span className="text-sm text-gray-400">Temperature:</span>
            <span className="text-4xl">{weatherData.temp} &#8457;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// To display when search yields no results
const NoResults = (props) => (
  <div>
    <div className="text-center pt-8">
      <span
        className="block text-5xl mb-8"
        role="img"
        aria-label="Confused face emoji"
      >
        😕
      </span>
      <div>
        <span>No weather found for </span>
        <span className="font-bold">"{props.city}"</span>
      </div>
    </div>
  </div>
);

// To display when data is being fetched
const LoadingSpinner = () => (
  <div>
    <svg
      className="mx-auto mt-16 animate-spin w-12 h-12 fill-transparent stroke-blue-500 stroke-[0.3rem]"
      viewBox="0 0 70 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" />
    </svg>
    <p className="text-center text-slate-500 py-4">Loading...</p>
  </div>
);

export default CityWeather;
