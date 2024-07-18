import React from "react";

import WeatherForm from "./components/WeatherForm";

const App = () => {
  return (
    <div className="bg-gradient-to-t to-blue-400 from-blue-900 h-screen">
      <h1 className="w-full py-5 md:py-10 capitalize text-3xl text-center font-semibold">
        max weather
      </h1>
      <WeatherForm />
    </div>
  );
};

export default App;
