import "./App.css";
import { OpenWeatherAPIComponent } from "./features/OpenWeatherAPIComponent";
import WeatherApiComponent from "./features/WeatherApiComponent";

function App() {
  return (
    <div className="App">
      {/* <WeatherApiComponent /> */}
      <OpenWeatherAPIComponent />
    </div>
  );
}

export default App;
