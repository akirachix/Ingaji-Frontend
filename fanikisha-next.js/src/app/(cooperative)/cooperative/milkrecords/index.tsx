"use client";
import React, { useState } from "react";
import { Farmer } from "@/app/utils/types";
import { useAddMilkRecord } from "@/app/hooks/useAddMilkRecords";


interface AddMilkRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmer: Farmer | null;
}

const AddMilkRecordModal: React.FC<AddMilkRecordModalProps> = ({
  isOpen,
  onClose,
  farmer,
}) => {
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price] = useState("70"); 
  const { isSubmitting, errorMessage, addMilkRecord } = useAddMilkRecord();

  if (!isOpen || !farmer) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const milkRecord = {
      farmer_id: farmer.farmer_id,
      date,
      milk_quantity: parseFloat(quantity),
      price: parseFloat(price),
    };

    await addMilkRecord(milkRecord);
    if (!errorMessage) onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Add Milk Record for {farmer.first_name} {farmer.last_name}
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-3">{errorMessage}</div>
        )}
        <form onSubmit={handleFormSubmit}>
          <label className="block mb-2">
            Date:
            <input
              type="date"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="block mb-2">
            Quantity (Liters):
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <label className="block mb-2">
            Price (KES):
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={price}
              readOnly
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMilkRecordModal;
