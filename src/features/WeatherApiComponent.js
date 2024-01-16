import axios from "axios";
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
import React from "react";

const WeatherApiComponent = () => {
  const [colorW, setColor] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [wetherData, setWetherData] = useState();
  const [currentTime, setTime] = useState();
  const [currentCloud, setCloud] = useState();
  const [currentTemprature, setTemprature] = useState();
  const [dayTime, setDayTime] = useState("");
  const [currentSeason, setCurrentSeason] = useState("");
  const [region, setRegion] = useState("");
  const [currentImage, setImage] = useState(morningS);
  const apiKey = "5017a379926d4e3c84151117241201";
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

  useEffect(() => {
    if (latitude && longitude && apiKey) {
      const weather = async () => {
        setIsloading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        setWetherData(response?.data);
        setIsloading(false);
      };
      weather();
    }
  }, [latitude, longitude, apiKey]);
  console.log(wetherData, "wetherData");
  console.log({ latitude, longitude });

  useEffect(() => {
    if (wetherData) {
      setTime(wetherData?.location?.localtime);
      setCloud(wetherData?.current?.cloud);
      setTemprature(wetherData?.current?.temp_c);
      setRegion(wetherData?.location?.region);
    }
  }, [wetherData]);

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
        setColor(true);
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
        setColor(true);
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
        setColor(true);
      }
    } else if (currentSeason === "winter") {
      if (dayTime === "morning") {
        setImage(morningW);
      } else if (dayTime === "afternoon") {
        setColor(true);
        setImage(noonW);
      } else if (dayTime === "evening") {
        setImage(eveningW);
      } else if (dayTime === "night") {
        setColor(true);
        setImage(nightW);
      }
    }
  }, [currentSeason, dayTime]);

  console.log({
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
                    Temprature : {currentTemprature}{" "}
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
export default WeatherApiComponent;
