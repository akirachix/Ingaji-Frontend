"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Farmer, NewFarmer, Cooperative, Sacco } from "@/app/utils/types";
import { useCreateFarmer } from "@/app/hooks/useCreateFarmer";

interface AddFarmerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFarmerAdded: (farmer: Farmer) => void;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "Phone Number must be only digits")
    .min(10, "Phone Number must be at least 10 digits")
    .required("Phone Number is required"),
  cooperative_id: Yup.string().required("Cooperative ID is required"),
  sacco_id: Yup.number().required("Sacco ID is required"),
});

const AddFarmerModal: React.FC<AddFarmerModalProps> = ({
  isOpen,
  onClose,
  onFarmerAdded,
}) => {
  const [cooperatives, setCooperatives] = useState<Cooperative[]>([]);
  const [saccos, setSaccos] = useState<Sacco[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewFarmer>({
    resolver: yupResolver(validationSchema),
  });

  const { submitFarmer, isSubmitting } = useCreateFarmer();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCooperatives = async () => {
      try {
        const response = await fetch(
          "https://fanikisha-3beb7fcefffe.herokuapp.com/api/cooperative/"
        );
        const data: Cooperative[] = await response.json();
        setCooperatives(data);
      } catch (error) {
        console.error("Error fetching cooperatives:", error);
      }
    };

    const fetchSaccos = async () => {
      try {
        const response = await fetch(
          "https://fanikisha-3beb7fcefffe.herokuapp.com/api/sacco"
        );
        const data: Sacco[] = await response.json();
        setSaccos(data);
      } catch (error) {
        console.error("Error fetching saccos:", error);
      }
    };

    fetchCooperatives();
    fetchSaccos();
  }, []);

  const onSubmit = async (data: NewFarmer) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const newFarmer = await submitFarmer(data);
      onFarmerAdded(newFarmer);
      setSuccessMessage("Farmer has been added successfully!");

      setTimeout(() => {
        onClose();
        reset();
        setSuccessMessage(null);
      }, 2000);
    } catch (error) {
      setErrorMessage((error as Error).message || "An unknown error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[600px] flex flex-col">
        <h2 className="text-[34px] font-bold mb-4 text-customBlue text-center">
          New Farmer
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col"
        >
          <div className="mb-3">
            <label className="block text-[18px] font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              {...register("first_name")}
              className={`mt-1 p-2 w-full border rounded ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.first_name && (
              <div className="text-red-500 text-sm">
                {errors.first_name.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-[18px] font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              {...register("last_name")}
              className={`mt-1 p-2 w-full border rounded ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.last_name && (
              <div className="text-red-500 text-sm">
                {errors.last_name.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-[18px] font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone_number")}
              className={`mt-1 p-2 w-full border rounded ${
                errors.phone_number ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone_number && (
              <div className="text-red-500 text-sm">
                {errors.phone_number.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-[18px] font-medium text-gray-700">
              Cooperative
            </label>
            <select
              {...register("cooperative_id")}
              className={`mt-1 p-2 w-full border rounded ${
                errors.cooperative_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Cooperative</option>
              {cooperatives.map((cooperative) => (
                <option
                  key={cooperative.cooperative_id}
                  value={cooperative.cooperative_id}
                >
                  {cooperative.cooperative_name}
                </option>
              ))}
            </select>
            {errors.cooperative_id && (
              <div className="text-red-500 text-sm">
                {errors.cooperative_id.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-[18px] font-medium text-gray-700">
              Sacco
            </label>
            <select
              {...register("sacco_id")}
              className={`mt-1 p-2 w-full border rounded ${
                errors.sacco_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Sacco</option>
              {saccos.map((sacco) => (
                <option key={sacco.sacco_id} value={sacco.sacco_id}>
                  {sacco.sacco_name}
                </option>
              ))}
            </select>
            {errors.sacco_id && (
              <div className="text-red-500 text-sm">
                {errors.sacco_id.message}
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="text-red-500 text-lg text-center mb-2">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="text-green-500 text-lg text-center mb-2">
              {successMessage}
            </div>
          )}

          <div className="flex justify-center mt-4 gap-72">
            <button
              type="button"
              className="bg-customBlue text-white px-6 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-2 rounded-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Farmer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarmerModal;
