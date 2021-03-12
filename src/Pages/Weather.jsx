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

  if (loading) return <p>Loading ...</p>;

  return (
    <>
      <div className="text-center">
        {!cityData && (
          <div>
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
      </div>

      <div className="mt-10 bg-green-50 w-1/2 m-0 m-auto rounded-lg">
        {cityData && <WeatherResult results={cityData} />}
      </div>
      <button
        className="bg-gray-200 rounded font-bold py-2 px-4 rounded"
        onClick={() => resetForm()}
      >
        Reset
      </button>
    </>
  );
}

export default Weather;
