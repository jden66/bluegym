import axios from "axios";
import useSWR from "swr";

const getMembers = async (_, trainerId) => {
  const { data } = await axios.get(`/member?trainer=${trainerId}`);
  return data;
};

export default function useMembers(trainerId) {
  const { data, error } = useSWR(
    trainerId ? ["/getMembers", trainerId] : null,
    getMembers
  );

  return { loading: !data && !error, data, error };
}
