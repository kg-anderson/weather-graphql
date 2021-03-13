import React from "react";

function WeatherResult(props) {
  //   const { name, country } = props.results;
  const {
    name,
    country,
    weather: {
      timestamp,
      summary: { icon, description },
      temperature: { min, max, actual },
    },
  } = props.results;

  return (
    <div>
      <h1 className="text-3xl inline-block">{name}</h1>
      <h5 className="text-lg inline-block ml-2">{country}</h5>

      <div>
        <p className="text-sm inline-block mr-2">
          {new Date(timestamp * 1000).toLocaleDateString("en-GB")}
        </p>
        <p className="text-sm inline-block mr-2">
          {new Date(timestamp * 1000).toLocaleTimeString("en-GB")}
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="current weather"
        />
        <div className="flex flex-col mt-5">
          <p className="text-sm">
            Min {Math.round(min)}
            {"\u00b0"}C
          </p>
          <p className="text-sm">
            Max {Math.round(max)}
            {"\u00b0"}C
          </p>
          <p>
            Actual {Math.round(actual)}
            {"\u00b0"}C
          </p>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default WeatherResult;
