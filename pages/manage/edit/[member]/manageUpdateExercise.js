import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import PageHeader from "../../../../components/pageHeader";
import useTodayExercises from "../../../../effects/useTodayExercises";
import ManageExercise from "./manageExercise";

export default function ManageUpdateExercise({ member }) {
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useTodayExercises(
    member,
    query?.date,
    query?.date
  );

  const handleSubmit = async (data) => {
    try {
      await axios.patch(`/todayexercise`, data);

      enqueueSnackbar("오늘의 운동 수정 성공", { variant: "success" });
      push(`/manage?user=${member.id}`);
    } catch (error) {
      enqueueSnackbar("오늘의 운동 수정 실패", { variant: "error" });
    }
  };
  return (
    <>
      <PageHeader title="오늘의 운동 수정" />
      <ManageExercise
        member={member}
        loading={loading}
        userExercises={data}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
