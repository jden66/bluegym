import { Box } from "@mui/material";
import { useRouter } from "next/router";
import useMember from "../../../../effects/useMember";
import ManageCreateExercise from "./manageCreateExercise";
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
