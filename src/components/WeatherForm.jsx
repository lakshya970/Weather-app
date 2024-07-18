import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import WeatherMenu from "./WeatherMenu";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { BsClouds } from "react-icons/bs";
import { MdOutlineVisibility } from "react-icons/md";
import { GiMultiDirections } from "react-icons/gi";
import { IoMdSpeedometer } from "react-icons/io";
import Loading from "./Loading";

const WeatherForm = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const hendleSumite = (e) => {
    e.preventDefault();
    fetchWeather(inputRef.current.value);
  };

  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.location && data.current) {
        setWeather(data);
        console.log(data);
      } else {
        throw new Error("Incomplete data received from API");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchWeather("jaipur");
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={hendleSumite}
        className="flex items-center max-w-md mx-auto bg-white/30 py-2.5 px-2 rounded-md"
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Search Weather"
          className="w-full bg-transparent border-none focus:outline-none placeholder:text-white/70"
        />

        <BiSearch size={22} className=" cursor-pointer" />
      </form>
      <div className="p-5 flex justify-around items-center">
        <div>
          <div className="md:flex items-center ">
            <h2 className=" text-4xl">{weather.location.name}</h2>
            <div className="md:px-3 py-2">
              <p className="text-white/80">
                {weather.location.region}, {weather.location.country}
              </p>
              <span className="text-xs font-normal">
                {weather.location.localtime}
              </span>
            </div>
          </div>

          <p>{weather.current.condition.text}</p>
        </div>
        <div>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="w-[140px]"
          />
        </div>
        <div className="flex items-center ">
          <div className="flex flex-col">
            <span>Feels Like: {weather.current.feelslike_c}°C</span>
            <span className="text-5xl md:text-7xl font-light">
              {Number(weather.current.temp_c).toFixed(0)}°C
            </span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-10 mt-6 mx-10 md:mx-16">
        <WeatherMenu
          title={"Wind"}
          icon={<FiWind />}
          text={weather.current.wind_kph}
          simbol={"km/h"}
        />
        <WeatherMenu
          title={"Humidity"}
          icon={<WiHumidity />}
          text={weather.current.humidity}
          simbol={"%"}
        />
        <WeatherMenu
          title={"Clouds"}
          icon={<BsClouds />}
          text={weather.current.cloud}
          simbol={"%"}
        />
        <WeatherMenu
          title={"Visibility"}
          icon={<MdOutlineVisibility />}
          text={weather.current.vis_km}
          simbol={"km"}
        />
        <WeatherMenu
          title={"Direction"}
          icon={<GiMultiDirections />}
          text={weather.current.wind_dir}
        />
        <WeatherMenu
          title={"Pressure"}
          icon={<IoMdSpeedometer />}
          text={weather.current.pressure_mb}
          simbol={"hPa"}
        />
      </div>
    </div>
  );
};

export default WeatherForm;
