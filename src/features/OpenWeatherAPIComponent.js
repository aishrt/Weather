import clsx from "clsx";
import { useEffect, useState } from "react";

import "./dashboard.css";
// ----------- Spring Images --------------
import morningSi from "../assets/morningSi.png";
import noonSi from "../assets/noonSi.png";
import eveningSi from "../assets/eveningSi.png";
import nightSi from "../assets/nightSi.png";
// ----------- SUMMER Images --------------
import morningS from "../assets/morningS.png";
import noonS from "../assets/noonS.png";
import eveningS from "../assets/eveningS.png";
import nightS from "../assets/nightS.png";
// ----------- Auttom Images --------------
import morningA from "../assets/morningA.png";
import noonA from "../assets/noonA.png";
import eveningA from "../assets/eveningA.png";
import nightA from "../assets/nightA.png";
// ----------- Winter Images --------------
import morningW from "../assets/morningW.png";
import noonW from "../assets/noonW.png";
import eveningW from "../assets/eveningW.png";
import nightW from "../assets/nightW.png";

export const OpenWeatherAPIComponent = () => {
  const [isLoading, setIsloading] = useState(false);
  const [currentCloud, setCloud] = useState();
  const [currentTemprature, setTemprature] = useState();
  const [currentTempratureDegree, setTempratureDegree] = useState();
  const [dayTime, setDayTime] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");
  const [region, setRegion] = useState("");
  const [currentImage, setImage] = useState(morningS);
  const [timezone, setTimezone] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      // Log something after obtaining the location
    };

    getLocation();
  }, []);

  // ==============================================?
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "dc3c131350a39c11be6b1de5edaf0a54";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
          setIsloading(false);
        } else {
          setIsloading(false);
          setError(data.message || "Failed to fetch weather data");
        }
      } catch (error) {
        setError("Error fetching weather data");
        setIsloading(false);
      } finally {
        setIsloading(false);
      }
    };

    fetchData();
  }, [apiUrl]);
  // ===================================================
  console.log(weatherData, "weatherData We are getting");

  useEffect(() => {
    if ("DateTimeFormat" in Intl) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(userTimezone);
      const currentTimeInUserTimezone = new Date().toLocaleString("en-US", {
        timeZone: userTimezone,
        // timeZone: 'America/Toronto', //America/Adak  , Pacific/Midway
      });
      setCurrentTime(currentTimeInUserTimezone);
    } else {
      console.error("Intl.DateTimeFormat API is not supported");
    }
  }, []);

  useEffect(() => {
    if (weatherData) {
      setCloud(weatherData?.weather?.main?.cloud);
      setTemprature(weatherData?.main?.temp);
      setRegion(weatherData?.name);
    }
  }, [weatherData]);

  useEffect(() => {
    const getCurrentSeason = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const month = dateTime.getMonth() + 1;

      if (month >= 3 && month <= 4) {
        setCurrentSeason("spring");
      } else if (month >= 5 && month <= 8) {
        setCurrentSeason("summer");
      } else if (month >= 9 && month <= 11) {
        setCurrentSeason("autumn");
      } else {
        setCurrentSeason("winter");
      }
    };

    getCurrentSeason(currentTime);
  }, [currentTime]);

  useEffect(() => {
    if (currentTemprature) {
      const temperatureInCelsius = currentTemprature - 273;
      const roundedTemperature = Math.floor(temperatureInCelsius);
      setTempratureDegree(roundedTemperature);
    }
  }, [currentTemprature]);

  useEffect(() => {
    const updateState = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const hour = dateTime.getHours();

      if (hour >= 4 && hour < 12) {
        setDayTime("morning");
      } else if (hour >= 12 && hour < 17) {
        setDayTime("afternoon");
      } else if (hour >= 17 && hour < 20) {
        setDayTime("evening");
      } else {
        setDayTime("night");
      }
    };

    updateState(currentTime);
  }, [currentTime]);

  useEffect(() => {
    if (currentSeason === "spring") {
      if (dayTime === "morning") {
        setImage(morningSi);
      } else if (dayTime === "afternoon") {
        setImage(noonSi);
      } else if (dayTime === "evening") {
        setImage(eveningSi);
      } else if (dayTime === "night") {
        setImage(nightSi);
      }
    } else if (currentSeason === "summer") {
      if (dayTime === "morning") {
        setImage(morningS);
      } else if (dayTime === "afternoon") {
        setImage(noonS);
      } else if (dayTime === "evening") {
        setImage(eveningS);
      } else if (dayTime === "night") {
        setImage(nightS);
      }
    } else if (currentSeason === "autumn") {
      if (dayTime === "morning") {
        setImage(morningA);
      } else if (dayTime === "afternoon") {
        setImage(noonA);
      } else if (dayTime === "evening") {
        setImage(eveningA);
      } else if (dayTime === "night") {
        setImage(nightA);
      }
    } else if (currentSeason === "winter") {
      if (dayTime === "morning") {
        setImage(morningW);
      } else if (dayTime === "afternoon") {
        setImage(noonW);
      } else if (dayTime === "evening") {
        setImage(eveningW);
      } else if (dayTime === "night") {
        setImage(nightW);
      }
    }
  }, [currentSeason, dayTime]);

  console.log({
    latitude,
    longitude,
    timezone,
    currentSeason,
    dayTime,
    currentTime,
    currentTemprature,
    currentCloud,
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="container">
            <div className="company-morning ">
              <img className=" morning-img rounded" src={currentImage} alt="" />

              <div className="row ">
                <u>
                  <li>Day Time : {dayTime}</li>
                  <li>Time : {currentTime}</li>
                  <li>
                    Temprature : {currentTempratureDegree}{" "}
                    <sup>
                      <i className="fa-regular fa-circle"></i>C
                    </sup>
                  </li>
                  <li>Region : {region}</li>
                </u>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
