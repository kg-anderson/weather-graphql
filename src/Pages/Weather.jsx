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
          </>
        )}
      </div>
    </>
  );
}

export default Weather;
