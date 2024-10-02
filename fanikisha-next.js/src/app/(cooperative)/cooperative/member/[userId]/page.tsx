"use client";

import BarChartComponent from "@/app/(cooperative)/cooperative/components/BarChart"; // Ensure correct import path
import Layout from "@/app/components/Layout";
import { useFetchCreditScores } from "@/app/hooks/useFetchCreditScores";
import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords"; // Ensure this fetch function works as expected
import { useEffect, useState } from "react";

interface MilkRecord {
  record_id: number;
  farmer_id: number;
  milk_quantity: number;
  price: number;
  date: string;
}

// interface CreditScore {
//   credit_score_id: number;
//   score: number;
//   credit_worthiness: string;
//   loan_range: string;
//   last_checked_date: string;
//   is_eligible: boolean;
//   farmer_id: number;
// }

const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
  const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(userId as string);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await fetchMilkRecords();
        const filteredRecords = records.filter(
          (record: MilkRecord) => record.farmer_id === Number(userId)
        );
        setMilkRecords(filteredRecords);
      } catch (error) {
        console.error("Error fetching milk records:", error);
      }
    };

    fetchData();
  }, [userId]);

  const latestCreditScore = creditScores.sort(
    (a, b) =>
      new Date(b.last_checked_date).getTime() -
      new Date(a.last_checked_date).getTime()
  )[0];

  if (loadingCreditScores) return <p>Loading credit scores...</p>;
  if (!userId) return <p>Loading user information...</p>;

  console.log({ milkRecords });
  return (
    <Layout>
      <div className="p-5">
        <h1 className="text-xl font-bold mb-4 text-center">
          Member Status for User ID: {userId}
        </h1>
        <div className="mb-16">
          {latestCreditScore ? (
            <p className="text-center">
              <b>Eligibility:</b>{" "}
              {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
            </p>
          ) : (
            <p>Loading eligibility info...</p>
          )}
        </div>
        <div className="flex mb-8">
          <div className="flex-shrink-0">
            <BarChartComponent milkRecords={milkRecords} width={700} height={350} />
          </div>
          <div className="ml-24 mt-20">
            <h2 className="text-lg font-semibold">Latest Credit Score Info</h2>
            {latestCreditScore ? (
              <>
                <p>
                  <strong>Loan Range (KES):</strong>{" "}
                  {latestCreditScore.loan_range || "N/A"}
                </p>
                <p>
                  <strong>Credit Score:</strong>{" "}
                  {latestCreditScore.score || "N/A"}
                </p>
                <p>
                  <strong>Credit Worth:</strong>{" "}
                  {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
                </p>
              </>
            ) : (
              <p>Loading credit score info...</p>
            )}
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
                Date
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
                Credit Score
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
                Credit Worthiness
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
                Loan Range
              </th>
            </tr>
          </thead>
          <tbody>
            {creditScores.map((score) => (
              <tr key={score.credit_score_id} className={score.credit_worthiness.toLowerCase()}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {score.last_checked_date}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {score.score}
                </td>
                <td className="py-2 px-4 border-b border-gray-200" style={{ color: getColor(score.credit_worthiness) }}>
                  {score.credit_worthiness.toLowerCase()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {score.loan_range}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

const getColor = (worthiness: string) => {
  switch (worthiness.toLowerCase()) {
    case "high":
      return "green";
    case "good":
      return "orange";
    case "low":
      return "red";
    default:
      return "black";
  }
};

export default MemberPage;
