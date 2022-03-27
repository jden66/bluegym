import axios from "axios";
import useSWR from "swr";

const getExerciseData = async (_, trainerId) => {
  const { data } = await axios.get(`/exercise?trainer=${trainerId}`);
  return data;
};

export default function useExercise(trainerId) {
  const { data, error } = useSWR(
    trainerId ? ["getExercise", trainerId] : null,
    getExerciseData,
    {
      dedupingInterval: 1000 * 10,
    }
  );

  const loading = !data && !error;

  return { data, loading };
}
