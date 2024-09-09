import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { MdOutlineShoppingBag } from "react-icons/md";

<FaChevronDown />;

const Header = (props) => {
  const { cityName } = props;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const cities = [
    "Ulaanbaatar, Mongolia",
    "London, UK",
    "Paris, France",
    "Sacramento, CA",
    "Chicago, Il",
    "Dublin, Ireland",
    "Beijing, China",
  ];
  const [index, setIndex] = useState(0);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=Z78LJZY9XS4C5U48LVZ4PUQYL`;
  const { data: cityData = {}, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div> There was an error </div>;
  if (isLoading) return <div>...Loading</div>;

  const chooseCity = () => {};

  return (
    <div className="flex gap-4 w-full items-center">
      <div className="h-[45px] w-[45px] rounded-full bg-white flex items-center justify-center">
        <IoIosMore height={20} width={20} />
      </div>
      <div className="h-[45px] w-[45px] rounded-full bg-white flex items-center justify-center">
        <IoMdNotificationsOutline height={20} width={20} />
      </div>
      <div className="px-2 py-[5px] flex items-center gap-3 bg-white rounded-3xl w-1/2">
        <CiSearch />
        <input className="w-full" placeholder={`Search City`} />
      </div>
      <div className="flex px-3 items-center h-full bg-white gap-2 rounded-3xl ">
        <details className="dropdown bg">
          <summary className="m-1">{cityName}</summary>
          <ul
            onClick={chooseCity}
            className="menu dropdown-content rounded-box z-[1] w-52 p-2 bg-white"
          >
            {cities.map((city) => {
              return (
                <Link href={`/weather/${city}`}>
                  <p className="mb-4 border border-solid border-slate-400	">
                    {city}
                  </p>
                </Link>
              );
            })}
          </ul>
        </details>
        <GrLocation />
      </div>
      <div className="h-[45px] w-[45px] rounded-full bg-white flex items-center justify-center">
        <MdOutlineShoppingBag height={20} width={20} />
      </div>
      <div className="h-[45px] w-[45px] rounded-full bg-white flex items-center justify-center">
        <img
          className="h-full w-full rounded-full"
          src="https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?w=996&t=st=1725722874~exp=1725723474~hmac=bde07b2e2804721440510d09a88ebbd1e7a93733c9b562eb59a07bb9c396e094"
        />
      </div>
      <p> Tuguldur </p>
    </div>
  );
};

export default Header;
