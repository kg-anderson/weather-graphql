import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CITY_WEATHER_QUERY } from "../graphql/queries/Queries";
import WeatherResult from "../Components/WeatherResult";

function Weather() {
  const [inputCity, setInputCity] = useState("");
  const [cityData, setCityData] = useState(null);
  const [displayWeather, { loading, data, error }] = useLazyQuery(
    GET_CITY_WEATHER_QUERY,
    {
      onCompleted: (data) => setCityData(data.getCityByName),
    }
  );

  function resetForm() {
    setCityData(null);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p type="button" className="animate-pulse text-center text-2xl">
          Processing
        </p>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {!cityData && (
          <div className="m-0 m-auto">
            <h1>City Weather</h1>
            <input
              type="text"
              placeholder="Enter city name"
              onChange={(e) => {
                setInputCity(e.target.value);
              }}
            />
            <button
              onClick={() =>
                displayWeather({
                  variables: {
                    name: inputCity,
                    country: "",
                    config: { units: "metric" },
                  },
                })
              }
              className="bg-gray-200 rounded font-bold py-2 px-4 rounded"
            >
              Show me the weather
            </button>
          </div>
        )}

        <div className="mt-10 bg-green-50 rounded-lg">
          {cityData && (
            <>
              <WeatherResult results={cityData} />
              <button
                className="bg-gray-200 rounded font-bold py-2 px-4 rounded inline-block align-middle"
                onClick={() => resetForm()}
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
