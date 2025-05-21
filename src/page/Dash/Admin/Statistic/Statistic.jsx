import { CardBarType } from "./CarBarType";
import CardBarChart from "./CardBarChart";
import { CardLineChart } from "./CardLineChart";
import CardPieChart from "./CardPieChart";
import HeaderStats from "./HeaderStats";

export default function Statistic() {
  return (
    <>
      <HeaderStats />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4 mb-3">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardPieChart />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardBarType />
        </div>
      </div>
    </>
  );
}
