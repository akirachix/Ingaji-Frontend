"use client";
import React from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FarmersData } from "@/app/utils/types";

const schema = yup.object().shape({
  totalIncome: yup.number().required("Total income is required").positive("Must be a positive number"),
  age: yup.number().required("Age is required").positive().integer(),
  education: yup.string().required("Education is required"),
  carOwnership: yup.string().required("Car ownership is required"),
  numberOfChildren: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
  totalIncome2: yup.number().required("Total income is required").positive("Must be a positive number"),
  gender: yup.string().required("Gender is required"),
  familyMembers: yup.number().required("Number of family members is required").positive().integer(),
  familyStatus: yup.string().required("Family status is required"),
  housingType: yup.string().required("Housing type is required"),
  daysEmployed:yup.number().required("Days employed type is required"),
  occupationType:yup.string().required("Occupation type is required")

});

export default function FarmerDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FarmersData) => {
    console.log(data);
  };

  return (
    <Layout>
      <div className="bg-gray-100">
        <div className="bg-white p-40 ">
          <h2 className="text-2xl font-bold mb-6 text-center">Farmer Details</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter total income
                </label>
                <input
                  {...register("totalIncome")}
                  type="number"
                  placeholder="Total Income"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.totalIncome && <p className="text-red-500 text-sm">{errors.totalIncome.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter age
                </label>
                <input
                  {...register("age")}
                  type="number"
                  placeholder="Age"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter level of education
                </label>
                <select
                  {...register("education")}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>Tertiary</option>
                </select>
                {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Car ownership
                </label>
                <select
                  {...register("carOwnership")}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errors.carOwnership && <p className="text-red-500 text-sm">{errors.carOwnership.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter number of children
                </label>
                <input
                  {...register("numberOfChildren")}
                  type="number"
                  placeholder="Number of Children"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.numberOfChildren && <p className="text-red-500 text-sm">{errors.numberOfChildren.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter total income
                </label>
                <input
                  {...register("totalIncome2")}
                  type="number"
                  placeholder="Total Income"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.totalIncome2 && <p className="text-red-500 text-sm">{errors.totalIncome2.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter gender
                </label>
                <select
                  {...register("gender")}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of family members
                </label>
                <input
                  {...register("familyMembers")}
                  type="number"
                  placeholder="Family Members"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.familyMembers && <p className="text-red-500 text-sm">{errors.familyMembers.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter family status
                </label>
                <select
                  {...register("familyStatus")}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                </select>
                {errors.familyStatus && <p className="text-red-500 text-sm">{errors.familyStatus.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Days employed
                </label>
                <input
                  {...register("daysEmployed")}
                  type="number"
                  placeholder="Family Members"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.familyMembers && <p className="text-red-500 text-sm">{errors.familyMembers.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter housing type
                </label>
                <select
                  {...register("housingType")}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select</option>
                  <option>Rented</option>
                  <option>Owned</option>
                </select>
                {errors.housingType && <p className="text-red-500 text-sm">{errors.housingType.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter occupation type
                </label>
                <select
                  {...register("occupationType")}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select</option>
                  <option>Rented</option>
                  <option>Owned</option>
                </select>
                {errors.housingType && <p className="text-red-500 text-sm">{errors.housingType.message}</p>}
              </div>
            </div>
            

            <div className="flex justify-center">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
              >
                Check Eligibility
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}