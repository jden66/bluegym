import axios from "axios";
import useSWR from "swr";

async function getExerciseCount(_, trainerId) {
  try {
    const { data } = await axios.get(`/exercise/count?trainer=${trainerId}`);
    return data;
  } catch (error) {
    // 뭐로 하는게 좋을까..?
    return { count: 0 };
  }
}

export default function useExerciseCount(trainerId) {
  const { data, error } = useSWR(
    ["getExerciseCount", trainerId],
    getExerciseCount
  );
  const loading = !data && !error;
  return { loading, data };
}
