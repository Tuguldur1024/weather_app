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
const url = "https://countriesnow.space/api/v0.1/countries";

const Header = (props) => {
  const { cityName } = props;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const cities = [
    "Ulaanbaatar",
    "London",
    "Paris",
    "Sacramento",
    "Chicago",
    "Dublin",
    "Beijing",
  ];
  const [searchedCities, setSearchedCities] = useState([]);
  const { data: allCitiesWorld = {}, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div> There was an error </div>;
  if (isLoading) return <div>...Loading</div>;
  console.log(allCitiesWorld.data);
  console.log(allCitiesWorld.data[0].cities[0][1]);

  const numberOfCountry = allCitiesWorld.data.length;
  console.log(numberOfCountry);

  const searching = (e) => {
    let searchingValue = e.target.value;
    let cities = [];
    for (let i = 0; i < numberOfCountry; i++) {
      if (cities.length >= 5) {
        break;
      } else {
        const numberofCitiesInACountry = allCitiesWorld.data[i].cities.length;
        for (let j = 0; j < numberofCitiesInACountry; j++) {
          if (
            allCitiesWorld.data[i].cities[j].includes(searchingValue) &&
            !cities.includes(searchingValue)
          ) {
            cities.push(allCitiesWorld.data[i].cities[j]);
          }
        }
      }
    }
    setSearchedCities(cities);
  };

  const search = (e) => {};
  return (
    <div className="flex gap-4 w-full items-center">
      <div className="h-[45px] w-[45px] rounded-full bg-white flex items-center justify-center">
        <IoIosMore height={20} width={20} />
      </div>
      <div className="h-[45px] w-[45px] rounded-full bg-white flex items-center justify-center">
        <IoMdNotificationsOutline height={20} width={20} />
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="px-2 py-[5px] flex items-center gap-3 bg-white rounded-3xl w-full">
          <CiSearch />
          <div className=" flex flex-col gap-4 w-full static">
            <input
              className="w-full static "
              placeholder={`Search City`}
              onChange={(e) => searching(e)}
              onKeyDown={(e) => search(e)}
            />
          </div>
        </div>
      </div>

      <div className="flex px-3 items-center h-full bg-white gap-2 rounded-3xl ">
        <details className="dropdown bg">
          <summary className="m-1">{cityName}</summary>
          <ul
            // onClick={chooseCity}
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
