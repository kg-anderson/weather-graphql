import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CITY_WEATHER_QUERY } from "../graphql/queries/Queries";
import WeatherResult from "../Components/WeatherResult";

function Weather() {
  const [inputCity, setInputCity] = useState("");
  const [cityData, setCityData] = useState(null);
  const [displayWeather, { loading }] = useLazyQuery(GET_CITY_WEATHER_QUERY, {
    onCompleted: (data) => setCityData(data.getCityByName),
  });

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
            <h1 className="text-2xl">City Weather</h1>
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
              className="m-4 bg-gray-200 rounded font-bold py-2 px-4 rounded"
            >
              Show me the weather
            </button>
          </div>
        )}

        <div>
          {cityData && (
            <>
              <div className="mt-10 bg-green-50 rounded-lg p-10">
                <WeatherResult results={cityData} />
              </div>
              <button
                className="bg-gray-200 rounded font-bold py-2 px-4 rounded mt-4"
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
