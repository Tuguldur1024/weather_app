import useSWR from "swr";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const Body = (props) => {
  const { cityName } = props;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=Z78LJZY9XS4C5U48LVZ4PUQYL`;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: cityData = {}, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div> There was an error </div>;
  if (isLoading) return <div> ...Loading </div>;
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
                  {cityData.days[0].windspeed}{" "}
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
                  {cityData.days[0].visibility}
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
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-3xl bg-white p-5 " id="chancesOfRain">
          <p className="font-bold text-2xl"> Chances Of Rain </p>
        </div>
        <div className="rounded-3xl bg-white" id="AirQualityIndex"></div>
      </div>
    </div>
  );
};
export default Body;
