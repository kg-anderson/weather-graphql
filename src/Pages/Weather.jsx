import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CITY_WEATHER_QUERY } from "../graphql/queries/Queries";

function Weather() {
  const [inputCity, setInputCity] = useState("");
  const [displayWeather, { loading, data, error }] = useLazyQuery(
    GET_CITY_WEATHER_QUERY,
    {
      variables: {
        name: inputCity,
        country: "",
        config: { units: "metric" },
      },
    }
  );

  if (loading) return <p>Loading ...</p>;
  return (
    <>
      <div>
        <h1>City Weather</h1>
      </div>
      <input
        type="text"
        placeholder="Enter city name"
        onChange={(e) => {
          setInputCity(e.target.value);
        }}
      />
      <div>
        <button onClick={() => displayWeather()}>Show me the weather</button>
      </div>
      <div>
        {data && (
          <>
            <h1>{data.getCityByName.name}</h1>
            <p>
              Min {Math.round(data.getCityByName.weather.temperature.min)}
              {"\u00b0"}C
            </p>
            <p>
              Max {Math.round(data.getCityByName.weather.temperature.max)}
              {"\u00b0"}C
            </p>
            <p>
              Actual {Math.round(data.getCityByName.weather.temperature.actual)}
              {"\u00b0"}C
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${data.getCityByName.weather.summary.icon}@2x.png`}
              alt="current weather"
            />
            <p>
              {new Date(
                data.getCityByName.weather.timestamp * 1000
              ).toLocaleDateString("en-GB")}
            </p>
            <p>
              {new Date(
                data.getCityByName.weather.timestamp * 1000
              ).toLocaleTimeString("en-GB")}
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default Weather;
