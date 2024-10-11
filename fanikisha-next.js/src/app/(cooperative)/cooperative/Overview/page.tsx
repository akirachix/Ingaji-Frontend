"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
import Layout from "../../../Layout";

interface MilkRecord {
  farmer_id: number;
  milk_quantity: number;
  price: number;
  date: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      grid: { color: "rgba(0, 0, 0, 0.1)" },
      ticks: { display: true },
    },
  },
};

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allData, setAllData] = useState<MilkRecord[]>([]);
  const [filteredData, setFilteredData] = useState({
    totalFarmers: 0,
    activeFarmers: 0,
    inactiveFarmers: 0,
    registeredFarmersData: Array(12).fill(0),
    milkProductionData: Array(12).fill(0),
    totalPriceData: Array(12).fill(0),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const milkRecordsData: MilkRecord[] = await fetchMilkRecords();
      setAllData(milkRecordsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch milk records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterDataByMonth = useCallback(
    (month: number) => {
      const filteredRecords = allData.filter(
        (record) => new Date(record.date).getMonth() === month
      );

      const uniqueActiveFarmers = new Set(
        filteredRecords.map((record) => record.farmer_id)
      );
      const totalFarmers = uniqueActiveFarmers.size;

      const milkProductionByMonth = Array(12).fill(0);
      const totalPriceByMonth = Array(12).fill(0);

      filteredRecords.forEach((record) => {
        milkProductionByMonth[month] += record.milk_quantity;
        totalPriceByMonth[month] += record.price;
      });

      setFilteredData({
        totalFarmers,
        activeFarmers: totalFarmers,
        inactiveFarmers: 0,
        registeredFarmersData: Array(12)
          .fill(0)
          .map((_, index) => (index === month ? totalFarmers : 0)),
        milkProductionData: milkProductionByMonth,
        totalPriceData: totalPriceByMonth,
      });
    },
    [allData]
  );

  useEffect(() => {
    filterDataByMonth(selectedDate.getMonth());
  }, [selectedDate, filterDataByMonth]);

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: "Registered Farmers",
        data: filteredData.registeredFarmersData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const milkProductionChartData = {
    labels: months,
    datasets: [
      {
        label: "Milk Production",
        data: filteredData.milkProductionData,
        backgroundColor: "rgb(59, 130, 246)",
      },
    ],
  };

  const totalPriceChartData = {
    labels: months,
    datasets: [
      {
        label: "Total Price",
        data: filteredData.totalPriceData,
        backgroundColor: "rgb(0,0,0)",
      },
    ],
  };

  return (
    <Layout>
      <div>
        <div className="">
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="flex justify-center mb-2 ">
                <input
                  type="month"
                  value={`${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}`}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="rounded-md p-2 bg-white shadow-sm text-md cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-9 ">
                <div className="bg-white w-auto rounded-lg shadow-md text-center">
                  <p className="text-3xl font-bold text-blue-500">
                    {filteredData.totalFarmers}
                  </p>
                  <p className="text-lg text-gray-600">Total Farmers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-3xl w-auto font-bold text-blue-500">
                    {filteredData.activeFarmers}
                  </p>
                  <p className="text-lg text-gray-600">Active Farmers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-3xl w-auto font-bold text-blue-500">
                    {filteredData.inactiveFarmers}
                  </p>

                  <p className="text-lg text-gray-600">Inactive Farmers</p>
                </div>
              </div>

              <div className="2xl:mt-11 xl:w-[96%] 2xl:w-full">
                <div className="bg-white rounded-lg shadow-md mt-8">
                  <h2 className="text-lg font-semibold p-4 text-gray-800">
                    Distribution of registered farmers over the months
                  </h2>
                  <div className="h-60 xl:h-56 lg:h-40">
                    <Line data={lineChartData} options={chartOptions} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-15 lg:mb-20 xl:h-20 ">
                  <div className="bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold p-4 text-gray-800">
                      Total Milk Production
                    </h2>
                    <div className="h-60 ">
                      <Bar
                        data={milkProductionChartData}
                        options={chartOptions}
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold p-4 text-gray-800">
                      Total price per month
                    </h2>
                    <div className="h-60 px-2 ">
                      <Bar data={totalPriceChartData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
