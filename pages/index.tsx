import { useState } from "react";
// import { CityWeather } from "../components/city-weather";
import { CityWeatherRefactor } from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);
  return (
    <div className="pt-10 bg-blue-100 h-screen">
      <form
        className="flex items-center justify-center -ml-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          setCity((formdata.get("city") as string).toString());
        }}
      >
        <label
          htmlFor="weather-input"
          className="cursor-pointer text-lg capitalize"
        >
          Weather Search:
        </label>{" "}
        <input
          id="weather-input"
          data-testid="weather-input"
          className="ml-2 border w-40 h-12 px-2 py-1 border-blue-100 rounded-l-lg"
          type="text"
          name="city"
          autoFocus
        />
        <button
          data-testid="button"
          className="cursor font-bold text-white h-12 w-24 bg-blue-500 border rounded-r-lg p-2 uppercase font-extrabold"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* {city && (
        <div className="mt-4">
          <CityWeather city={city} />
        </div>
      )} */}

      {city && (
        <div
          data-testid="card"
          className="mt-10 flex items-center justify-center"
        >
          <CityWeatherRefactor city={city} />
        </div>
      )}
    </div>
  );
}
