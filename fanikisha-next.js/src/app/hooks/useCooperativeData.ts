"use client"
import { useState, useEffect } from 'react';
import { CooperativeData } from '../utils/types';
import { fetchMilkRecords } from '../utils/fetchMilkRecords';
import { fetchFarmers } from '../utils/fetchFarmers';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function useCooperativeData(): CooperativeData {
  const [data, setData] = useState<CooperativeData>({
    totalFarmers: 0,
    activeFarmers: 0,
    inactiveFarmers: 0,
    registeredFarmersData: [],
    milkProductionData: [],
    totalPriceData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmersData, milkRecordsData] = await Promise.all([
          fetchFarmers(),
          fetchMilkRecords(),
        ]);

        const uniqueActiveFarmers = new Set(milkRecordsData.map((record: { farmer: any; }) => record.farmer));

        const farmersByMonth = months.map(month => ({
          month,
          count: farmersData.filter((farmer: { date_registered: string | number | Date; }) => new Date(farmer.date_registered).getMonth() === months.indexOf(month)).length
        }));

        const milkProduction = months.map(month => ({
          month,
          total: milkRecordsData
            .filter((record: { date: string | number | Date; }) => new Date(record.date).getMonth() === months.indexOf(month))
            .reduce((sum: any, record: { quantity: any; }) => sum + record.quantity, 0)
        }));

        const totalPrice = months.map(month => ({
          month,
          total: milkRecordsData
            .filter((record: { date: string | number | Date; }) => new Date(record.date).getMonth() === months.indexOf(month))
            .reduce((sum: number, record: { quantity: number; price: number; }) => sum + record.quantity * record.price, 0)
        }));

        setData({
          totalFarmers: farmersData.length,
          activeFarmers: uniqueActiveFarmers.size,
          inactiveFarmers: farmersData.length - uniqueActiveFarmers.size,
          registeredFarmersData: farmersByMonth.map(data => data.count),
          milkProductionData: milkProduction.map(data => data.total),
          totalPriceData: totalPrice.map(data => data.total),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
}