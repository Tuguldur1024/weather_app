import Header from "../components/Header";
import useSWR from "swr";
import Body from "../components/Body";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const cityName = "Ulaanbaatar";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=Z78LJZY9XS4C5U48LVZ4PUQYL`;
  const { data: UbData = {}, error, isLoading } = useSWR(url, fetcher);
  if (error) return <div> There was an error </div>;
  if (isLoading) return <div> ...Loading </div>;
  return (
    <div className="max-w-screen-xl bg-[#F5F6FE] mx-auto px-5 py-3 rounded-3xl flex flex-col gap-8">
      <Header cityName="Ulaanbaatar, Mongolia" />
      <Body cityName={cityName} cityData={UbData} />
    </div>
  );
};

export default Home;
