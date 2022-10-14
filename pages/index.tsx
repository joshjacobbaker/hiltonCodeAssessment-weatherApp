import { useState } from "react";
// import { CityWeather } from "../components/city-weather";
import CityWeather from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);
  return (
    <div className="py-2 pb-24 bg-slate-200 min-h-screen">
      <form
        className="flex items-center justify-center gap-x-2 mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          setCity(formdata.get("city").toString());
        }}
      >
        <label className="text-lg font-medium" htmlFor="city">
          Weather Search:
        </label>{" "}
        <div className="flex">
          <input
            data-testid="weather-input"
            className="px-2 py-1 border border-r-0 border-slate-300 rounded-md rounded-r-none"
            type="text"
            name="city"
            id="city"
            required
          />
          <button
            className="p-3 rounded-md rounded-l-none font-bold text- text-white bg-[#488bd8] hover:bg-[#5295e1] active:bg-[#3c79bf] transition"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>

      {city && (
        <div className="mt-10">
          <CityWeather city={city} />
        </div>
      )}
    </div>
  );
}
