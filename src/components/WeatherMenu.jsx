import React from "react";

const WeatherMenu = ({ title, icon, text, simbol }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white/10 p-2 rounded-md py-4">
      <div className="font-semibold">{title}</div>
      <div className="text-3xl text-white/60">{icon}</div>
      <div className="font-light text-sm">
        {text} {simbol}
      </div>
    </div>
  );
};

export default WeatherMenu;
