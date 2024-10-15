import { useEffect, useState } from "react";
import { fetchScores } from "../utils/fetchScores";

export const useScore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedScore = await fetchScores();
        setData(fetchedScore);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching credit:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error fetching credit score:", err);
          setError("Error fetching credit score");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, []);

  return { data, loading, error };
};



// import { useEffect, useState } from "react";
// import { fetchScores } from "../utils/fetchScores";

// export const useScore = (cooperativeId: string | undefined) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Log the cooperativeId to debug
//     console.log("useScore hook received cooperativeId:", cooperativeId);

//     if (!cooperativeId) {
//       console.error("No cooperativeId provided");
//       return;
//     }

//     const fetchScore = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         console.log("Fetching scores for cooperativeId:", cooperativeId);

//         // Fetch the scores from API
//         const fetchedScore = await fetchScores(cooperativeId);
//         console.log("Fetched scores:", fetchedScore);

//         // Update state with the fetched data
//         setData(fetchedScore);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           console.error("Error fetching credit scores:", err.message);
//           setError(err.message);
//         } else {
//           console.error("Unknown error occurred while fetching scores", err);
//           setError("Unknown error occurred while fetching scores");
//         }
//       } finally {
//         // Always set loading to false once the fetch is done
//         setLoading(false);
//       }
//     };

//     // Call the function to fetch scores
//     fetchScore();
//   }, [cooperativeId]);

//   // Return the state and loading/error status
//   return { data, loading, error };
// };
