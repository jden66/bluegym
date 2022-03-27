import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useMember from "../../../../effects/useMember";
import useTodayExercises from "../../../../effects/useTodayExercises";
import ManageCreateExercise from "./ManageCreateExercise";
import ManageUpdateExercise from "./manageUpdateExercise";

export default function ManageEdit() {
  const { query } = useRouter();
  const { data, loading } = useMember(query?.member);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (query?.date) {
    return <ManageUpdateExercise member={data} />;
  }
  return (
    <>
      <ManageCreateExercise member={data} />
    </>
  );
}
