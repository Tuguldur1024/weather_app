import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Header from "../../components/Header";
import Body from "../../components/Body";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const City = () => {
  const router = useRouter();
  const cityName = router.query.city;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=Z78LJZY9XS4C5U48LVZ4PUQYL`;
  const { data: weatherData = {}, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div> There is an error </div>;
  if (isLoading) return <div> ...Loading </div>;

  return (
    <div className="max-w-screen-xl bg-[#F5F6FE] mx-auto px-5 py-3 rounded-3xl flex flex-col gap-8">
      <Header cityName={cityName} />
      <Body cityName={cityName} cityData={weatherData} />
    </div>
  );
};

export default City;
