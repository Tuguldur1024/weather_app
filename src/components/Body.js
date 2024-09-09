import useSWR from "swr";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: ["12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"],
  datasets: [
    {
      label: "GeeksforGeeks Line Chart",
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const Body = (props) => {
  const { cityName, cityData } = props;
  const chancesOfRain = cityData.days.slice(0, 7);
  const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
  };
  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col gap-5">
        <div className="rounded-3xl bg-white flex flex-col gap-3 justify-center p-5">
          <div className="flex gap-5">
            <button className="rounded-3xl px-[6px] py-1 bg-gray-300">
              Today
            </button>
            <button className="rounded-3xl px-[6px] py-1 bg-gray-300">
              Tomorrow
            </button>
            <button className="rounded-3xl px-[6px] py-1 bg-gray-300">
              Next 7 Days
            </button>
          </div>
          <div></div>
        </div>
        <div className="rounded-3xl bg-white flex flex-col gap-5 p-5">
          <p className="font-bold text-2xl"> Overview </p>
          <div className="flex gap-3">
            <div className="p-[5px] w-[160px] bg-gray-300 rounded-lg flex items-center gap-3">
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
            <div className="p-[7px] w-[160px] bg-gray-300 rounded-lg flex items-center gap-3">
              <FaWind style={{ height: "40px", width: "40px" }} />
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 font-light text-sm">Wind Speed</p>
                <p className="font-bold text-lg">
                  {cityData.days[0].windspeed} mph
                </p>
              </div>
            </div>
            <div className="p-[5px] w-[160px] bg-gray-300 rounded-lg flex items-center gap-3">
              <WiHumidity style={{ height: "40px", width: "40px" }} />
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 font-light text-sm">Humidity</p>
                <p className="font-bold text-lg">
                  {cityData.days[0].humidity}%
                </p>
              </div>
            </div>
            <div className="p-[5px] w-[160px] bg-gray-300 rounded-lg flex items-center gap-3">
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
          <div className="flex gap-5">
            <button className="rounded-3xl px-[6px] py-1 bg-gray-300">
              12 PM - 8 PM
            </button>
            <button className="rounded-3xl px-[6px] py-1 bg-gray-300">
              8 PM - 4 Am
            </button>
            <button className="rounded-3xl px-[6px] py-1 bg-gray-300">
              4 AM - 12 AM
            </button>
            <div style={{ width: "700px", height: "700px" }}>
              <h1>Example 1: Line Chart</h1>
              <Line data={data} />
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
            console.log(dayOfWeek);
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
