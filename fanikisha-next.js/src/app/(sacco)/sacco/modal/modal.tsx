"use client";
import { FarmerData } from "@/app/utils/types";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmersData: FarmerData[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, farmersData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg p-4 shadow-lg z-10">
        <h2 className="text-xl font-bold mb-4">Farmers in Cooperative</h2>
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mt-4">
          <thead>
            <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
              <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                Farmer Name
              </th>
              <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                Last Checked
              </th>
              <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                Score
              </th>
              <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                Status
              </th>
              <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                Eligibility
              </th>
            </tr>
          </thead>
          <tbody>
            {farmersData.map((farmer) => (
              <tr key={farmer.farmer_id} className="border-b border-gray-200">
                <td className="py-3 px-6">
                  {farmer.first_name} {farmer.last_name}
                </td>
                <td className="py-3 px-6">
                  {farmer.last_checked_date || "N/A"}
                </td>
                <td className="py-3 px-6">{farmer.score || "N/A"}</td>
                <td className="py-3 px-6">{farmer.status || "N/A"}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white rounded px-4 py-1">
                    {farmer.is_eligible ? "Eligible" : "Not Eligible"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
