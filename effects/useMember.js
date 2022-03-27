import axios from "axios";
import useSWR from "swr";

const getMember = async (_, id) => {
  const { data } = await axios.get(`/member/${id}`);
  return data;
};
export default function useMember(id) {
  const { data, error } = useSWR(id ? [`getMember`, id] : null, getMember);

  return {
    loading: !data && !error,
    data,
    error,
  };
}
