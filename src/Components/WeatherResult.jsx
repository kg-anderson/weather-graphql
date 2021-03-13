import React from "react";

function WeatherResult(props) {
  return (
    <div>
      <h1 className="text-3xl inline-block">{props.results.name}</h1>
      <h5 className="text-lg inline-block ml-2">{props.results.country}</h5>

      <div>
        <p className="text-sm inline-block mr-2">
          {new Date(props.results.weather.timestamp * 1000).toLocaleDateString(
            "en-GB"
          )}
        </p>
        <p className="text-sm inline-block mr-2">
          {new Date(props.results.weather.timestamp * 1000).toLocaleTimeString(
            "en-GB"
          )}
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={`http://openweathermap.org/img/wn/${props.results.weather.summary.icon}@2x.png`}
          alt="current weather"
        />
        <div className="flex flex-col mt-5">
          <p className="text-sm">
            Min {Math.round(props.results.weather.temperature.min)}
            {"\u00b0"}C
          </p>
          <p className="text-sm">
            Max {Math.round(props.results.weather.temperature.max)}
            {"\u00b0"}C
          </p>
          <p>
            Actual {Math.round(props.results.weather.temperature.actual)}
            {"\u00b0"}C
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherResult;
