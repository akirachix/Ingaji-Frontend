import { FarmerData } from "@/app/utils/types";
import { CooperativeWithFarmers } from "@/app/utils/types";

const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const cooperativesResponse = await fetch(`${baseURL}/api/cooperative/`);
    const cooperativesData = await cooperativesResponse.json();

    const cooperativeWithFarmerData = await Promise.all(
      cooperativesData.map(async (cooperative: CooperativeWithFarmers) => {
        const farmersResponse = await fetch(
          `${baseURL}/api/farmers/?cooperative_id=${cooperative.cooperative_id}`
        );
        const farmersData: FarmerData = await farmersResponse.json();

        return {
          ...cooperative,
          number_of_farmers: farmersData.count,
        };
      })
    );

    return new Response(JSON.stringify(cooperativeWithFarmerData), {
      status: 200,
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
