import useSWR from "swr";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { useState } from "react";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const Body = (props) => {
  const [index4Trending, setIndex4Trending] = useState(0);

  const handleTempTrend = (index) => {
    setIndex4Trending(index);
  };

  const { cityName, cityData } = props;
  let tempfirst = [];
  let tempsecond = [];
  let tempthird = [];
  for (let i = 8; i < 16; i++) {
    tempfirst.push(cityData.days[0].hours[i].temp);
  }
  for (let i = 16; i < 24; i++) {
    tempsecond.push(cityData.days[0].hours[i].temp);
  }
  for (let i = 0; i < 8; i++) {
    tempthird.push(cityData.days[0].hours[i].temp);
  }
  const dataFirst = {
    labels: ["12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"],
    datasets: [
      {
        label: "Temperatue",
        data: tempfirst,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const dataSecond = {
    labels: ["8PM", "9PM", "10PM", "11PM", "12PM", "1AM", "2AM", "3AM", "4AM"],
    datasets: [
      {
        label: "Temperatue",
        data: tempsecond,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const datathird = {
    labels: ["4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12AM"],
    datasets: [
      {
        label: "Temperatue",
        data: tempthird,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const hours = ["12PM - 8PM", "8PM - 4AM", "4AM - 12PM"];
  const data = [dataFirst, dataSecond, datathird];
  const chancesOfRain = cityData.days.slice(0, 7);
  const next7DaysTemp = cityData.days.slice(1, 8);
  const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
  };
  const week = ["Today", "Tomorrow", "Next 7 Days"];
  const [chooseSlide, setChooseSlide] = useState(2);
  const handleSlide = (index) => {
    setChooseSlide(index);
  };

  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl bg-white flex flex-col gap-6 justify-center p-5">
          <div className="flex gap-5">
            {week.map((day, index) => {
              let ischecked = index == chooseSlide;
              let background = ischecked
                ? "bg-[#585FB0] text-white"
                : "bg-gray-300";
              return (
                <button
                  onClick={() => handleSlide(index)}
                  className={`rounded-3xl px-[6px] py-1 ${background}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {chooseSlide == 0 && (
            <div>
              <div className="flex flex-col  gap-3 bg-gray-200 rounded-xl py-1.5 px-2">
                <p className="text-xl font-bold">
                  Temperatue : {cityData.days[0].temp}°{" "}
                </p>
                <p className="text-xl font-bold">
                  Condition : {cityData.days[0].conditions}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 text-xl font-bold">
                    <p> Maximum Temperatue : </p>
                    <p>{cityData.days[0].tempmax}°</p>
                  </div>
                  <div className="flex gap-3 text-xl font-bold">
                    <p> Minimum Temperature</p>
                    <p>{cityData.days[0].tempmin}°</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {chooseSlide == 1 && (
            <div>
              <div className="flex flex-col  gap-3 bg-gray-200 rounded-xl py-1.5 px-2">
                <p className="text-xl font-bold">
                  Temperatue : {cityData.days[1].temp}°{" "}
                </p>
                <p className="text-xl font-bold">
                  Condition : {cityData.days[1].conditions}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 text-xl font-bold">
                    <p> Maximum Temperatue : </p>
                    <p>{cityData.days[1].tempmax}°</p>
                  </div>
                  <div className="flex gap-3 text-xl font-bold">
                    <p> Minimum Temperature</p>
                    <p>{cityData.days[1].tempmin}°</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {chooseSlide == 2 && (
            <div className="flex gap-3">
              {next7DaysTemp.map((nextDay) => {
                const date = new Date(nextDay.datetime);
                const month = date.getUTCMonth() + 1;
                const day = date.getDate();
                const whichDay = date.getDay();
                return (
                  <div className="flex flex-col w-full text-center justify-between bg-gray-200 rounded-xl py-1.5">
                    <div>
                      <p> {days[whichDay].slice(0, 3)} </p>
                      <p className="mb-4"> {month + "/" + day}</p>
                    </div>

                    <div>
                      <p className="text-sm font-black"> {nextDay.tempmax}° </p>
                      <p className="text-sm  text-gray-500">
                        {nextDay.tempmin}°
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="rounded-3xl bg-white flex flex-col gap-5 p-5">
          <p className="font-bold text-2xl"> Overview </p>
          <div className="flex gap-3">
            <div className="p-[5px] w-[165px] bg-gray-300 rounded-lg flex items-center gap-3">
              <FaWind style={{ height: "40px", width: "40px" }} />
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 font-light text-sm">
                  Atmospheric Pressure
                </p>
                <p className="font-bold text-lg">
                  {cityData.days[0].pressure}{" "}
                </p>
              </div>
            </div>
            <div className="p-[7px] w-[165px] bg-gray-300 rounded-lg flex items-center gap-3">
              <FaWind style={{ height: "40px", width: "40px" }} />
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 font-light text-sm">Wind Speed</p>
                <p className="font-bold text-lg">
                  {cityData.days[0].windspeed} mph
                </p>
              </div>
            </div>
            <div className="p-[5px] w-[165px] bg-gray-300 rounded-lg flex items-center gap-3">
              <WiHumidity style={{ height: "40px", width: "40px" }} />
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 font-light text-sm">Humidity</p>
                <p className="font-bold text-lg">
                  {cityData.days[0].humidity}%
                </p>
              </div>
            </div>
            <div className="p-[5px] w-[165px] bg-gray-300 rounded-lg flex items-center gap-3">
              <MdVisibility style={{ height: "40px", width: "40px" }} />
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 font-light text-sm">Visibility</p>
                <p className="font-bold text-lg">
                  {cityData.days[0].visibility} Miles
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded-3xl bg-white flex flex-col gap-5 p-5"
          id="temperatureTrendData"
        >
          <p className="font-bold text-2xl">Temperature Trend Data</p>
          <div className="flex gap-5 flex-col">
            <div className="flex gap-3">
              {hours.map((hour, index) => {
                let ischecked = index == index4Trending;
                let background = ischecked
                  ? "bg-[#585FB0] text-white"
                  : "bg-gray-300";
                return (
                  <button
                    onClick={() => handleTempTrend(index)}
                    className={`rounded-3xl px-[6px] py-1 ${background}`}
                  >
                    {hour}
                  </button>
                );
              })}
            </div>

            <div>
              <Line data={data[index4Trending]} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="rounded-3xl bg-white p-5 flex flex-col gap-7">
          <p className="font-bold text-2xl"> Chances Of Rain </p>
          {chancesOfRain.map((day) => {
            const date = new Date(day.datetime);
            const dayOfWeek = date.getDay();
            return (
              <div className="flex gap-3 items-center justify-start">
                <p className="text-gray-400 w-[90px]">{days[dayOfWeek]} </p>
                <progress
                  className="progress progress-primary w-[200px] h-6"
                  value={day.precipprob}
                  max="100"
                ></progress>
                <p className="text-lg font-semibold"> {day.precipprob}%</p>
              </div>
            );
          })}
        </div>
        <div className="rounded-3xl bg-[#5A60AB] text-white flex flex-col gap-5 p-5 ">
          <p className="font-semibold text-lg">Conditions and Description</p>
          <div className="bg-[#6A70B3] p-2 flex flex-col gap-2 rounded-2xl">
            <p className="font-semibold text-sm"> Conditions </p>
            <p className="font-light text-xs">{cityData.days[0].conditions}</p>
          </div>
          <div className="bg-[#6A70B3] p-2 flex flex-col gap-2 rounded-2xl">
            <p className="font-semibold text-sm"> Descriptions </p>
            <p className="font-light text-xs">{cityData.days[0].description}</p>
          </div>
          <div className="bg-[#6A70B3] p-2 flex flex-col gap-2 rounded-2xl">
            <p className="font-semibold text-sm"> Sunrise </p>
            <p className="font-light text-xs">{cityData.days[0].sunrise}</p>
          </div>
          <div className="bg-[#6A70B3] p-2 flex flex-col gap-2 rounded-2xl">
            <p className="font-semibold text-sm"> Sunset </p>
            <p className="font-light text-xs">{cityData.days[0].sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Body;
