import CardStats from "./CardStats";
import { FaRegChartBar } from "react-icons/fa";
import { IoPeopleSharp, IoPieChartOutline } from "react-icons/io5";
import { CgPerformance } from "react-icons/cg";
import { useEffect, useState } from "react";
import { statisticApi } from "../../../../api/statistic";

export default function HeaderStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalTopUpTransactions: 0,
    totalVipRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statisticApi.getCardStatistics();
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="relative bg-lightBlue-600 md:pt-10 pb-20 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="TOTAL USERS"
              statTitle={stats.totalUsers.toString()}
              statArrow="up"
              statPercent="5.2"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName={<FaRegChartBar />}
              statIconColor="bg-red-500"
            />
          </div>

          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="TOTAL POSTS"
              statTitle={stats.totalPosts.toString()}
              statArrow="up"
              statPercent="2.1"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName={<IoPieChartOutline />}
              statIconColor="bg-orange-500"
            />
          </div>

          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="TOP-UP TRANSACTIONS"
              statTitle={stats.totalTopUpTransactions.toString()}
              statArrow="down"
              statPercent="0"
              statPercentColor="text-red-500"
              statDescripiron="Since last month"
              statIconName={<IoPeopleSharp />}
              statIconColor="bg-pink-500"
            />
          </div>

          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="VIP REVENUE"
              statTitle={`₫${stats.totalVipRevenue.toLocaleString()}`}
              statArrow="up"
              statPercent="10"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName={<CgPerformance />}
              statIconColor="bg-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
