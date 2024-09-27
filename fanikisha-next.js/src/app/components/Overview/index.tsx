"use client"
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';
import { fetchMilkRecords } from '@/app/utils/fetchMilkRecords';

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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        display: true,
      },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const milkRecordsData: MilkRecord[] = await fetchMilkRecords();
        setAllData(milkRecordsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterDataByMonth(selectedDate.getMonth());
  }, [selectedDate, allData]);

  const filterDataByMonth = (month: number) => {
    const filteredRecords = allData.filter(record => new Date(record.date).getMonth() === month);

    const uniqueActiveFarmers = new Set(filteredRecords.map(record => record.farmer_id));
    const totalFarmers = uniqueActiveFarmers.size;

    const milkProductionByMonth = Array(12).fill(0);
    const totalPriceByMonth = Array(12).fill(0);

    filteredRecords.forEach(record => {
      milkProductionByMonth[month] += record.milk_quantity;
      totalPriceByMonth[month] += record.price;
    });

    setFilteredData({
      totalFarmers,
      activeFarmers: totalFarmers,
      inactiveFarmers: 0, 
      registeredFarmersData: Array(12).fill(0).map((_, index) => index === month ? totalFarmers : 0),
      milkProductionData: milkProductionByMonth,
      totalPriceData: totalPriceByMonth,
    });
  };

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Registered Farmers',
        data: filteredData.registeredFarmersData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const milkProductionChartData = {
    labels: months,
    datasets: [
      {
        label: 'Milk Production',
        data: filteredData.milkProductionData,
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  const totalPriceChartData = {
    labels: months,
    datasets: [
      {
        label: 'Total Price',
        data: filteredData.totalPriceData,
        backgroundColor: 'rgb(0,0,0)',
      },
    ],
  };

  return (
    <div className="w-80% mr-48 h-10">
      <div className="flex justify-end mb-2 ">
        <input
          type="month"
          value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border rounded-md p-1 bg-white shadow-sm text-sm cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 mt-9 ">
        <div className="bg-white p-2 rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] text-center w-60">
          <p className="text-lg font-bold text-blue-500">{filteredData.totalFarmers}</p>
          <p className="text-xs text-gray-600">Total Farmers</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] text-center w-60">
          <p className="text-lg font-bold text-blue-500">{filteredData.activeFarmers}</p>
          <p className="text-xs text-gray-600">Active Farmers</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] text-center w-60">
          <p className="text-lg font-bold text-blue-500">{filteredData.inactiveFarmers}</p>
          <p className="text-xs text-gray-600">Inactive Farmers</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-sm font-semibold p-2 text-gray-800">Distribution of registered farmers over the months</h2>
          <div className="h-40 px-2 pb-2">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-sm font-semibold p-2 text-gray-800">Total Milk Production</h2>
            <div className="h-40 px-2 pb-2">
              <Bar data={milkProductionChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-sm font-semibold p-2 text-gray-800">Total price per month</h2>
            <div className="h-40 px-2 pb-2">
              <Bar data={totalPriceChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;