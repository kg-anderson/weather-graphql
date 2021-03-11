import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CITY_WEATHER_QUERY } from "../graphql/queries/Queries";

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
            >
              Show me the weather
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 bg-green-50 w-1/2 m-0 m-auto rounded-lg">
        {cityData && (
          <>
            <h1 className="text-3xl inline-block">{data.getCityByName.name}</h1>
            <h5 className="text-lg inline-block ml-2">
              {data.getCityByName.country}
            </h5>

            <div>
              <p className="text-sm inline-block mr-2">
                {new Date(
                  data.getCityByName.weather.timestamp * 1000
                ).toLocaleDateString("en-GB")}
              </p>
              <p className="text-sm inline-block mr-2">
                {new Date(
                  data.getCityByName.weather.timestamp * 1000
                ).toLocaleTimeString("en-GB")}
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src={`http://openweathermap.org/img/wn/${data.getCityByName.weather.summary.icon}@2x.png`}
                alt="current weather"
              />
              <div className="flex flex-col mt-5">
                <p className="text-sm">
                  Min {Math.round(data.getCityByName.weather.temperature.min)}
                  {"\u00b0"}C
                </p>
                <p className="text-sm">
                  Max {Math.round(data.getCityByName.weather.temperature.max)}
                  {"\u00b0"}C
                </p>
                <p>
                  Actual{" "}
                  {Math.round(data.getCityByName.weather.temperature.actual)}
                  {"\u00b0"}C
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <button onClick={() => resetForm()}>Reset</button>
    </>
  );
}

export default Weather;
