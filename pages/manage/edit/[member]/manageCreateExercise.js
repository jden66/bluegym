import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PageHeader from "../../../../components/pageHeader";
import ManageExercise from "./manageExercise";

export default function ManageCreateExercise({ member }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (data) => {
    try {
      await axios.post(`/todayexercise`, data);

      enqueueSnackbar("오늘의 운동 생성 성공", { variant: "success" });
      push(`/manage?user=${member.id}`);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("오늘의 운동 생성 실패", { variant: "error" });
    }
  };

  return (
    <>
      <PageHeader title="오늘의 운동 생성" />
      <ManageExercise
        member={member}
        userExercises={[]}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
