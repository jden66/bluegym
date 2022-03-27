import { Box, Skeleton } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../../core/contexts/AppContext";
import useExerciseCount from "../../../effects/useExerciseCount";
import { Item } from "../../../components/styleds";

export default function ExerciseHeaderInfo() {
  const user = useContext(AppContext);
  const { data, loading } = useExerciseCount(user?.id);

  return (
    <Item>
      {user ? (
        <>
          {loading ? (
            <Skeleton variant="rectangular" />
          ) : (
            <Box>{user?.name} 님</Box>
          )}
          {loading ? (
            <Skeleton variant="rectangular" />
          ) : (
            <Box>등록한 운동 개수 : {loading ? "-" : data?.count}</Box>
          )}
        </>
      ) : (
        "로그인이 필요합니다"
      )}
    </Item>
  );
}
