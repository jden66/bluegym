import {
  Box,
  Button,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import AppContext from "../../../core/contexts/AppContext";
import useExercise from "../../../effects/useExercise";
import { Item } from "../../../components/styleds";
import ListComponent from "./listComponent";

/**
 * 이건 서버에서 불러와서 뿌려주는게 더 빠를듯
 */
export default function ExerciseList({ handleModalOpen }) {
  const user = useContext(AppContext);
  const { data: exercise, e_loading } = useExercise(user?.id);
  return (
    <Item>
      <Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography>{user?.id}님의 운동 리스트</Typography>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={(e) => handleModalOpen(e, "create")}
          >
            운동 추가
          </Button>
        </Stack>
        <Box sx={{ m: "10px 0", height: 10 }}>
          {e_loading && <LinearProgress />}
        </Box>
        {e_loading ? (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        ) : (
          <ListComponent items={exercise} handleClick={handleModalOpen} />
        )}
      </Stack>
      {/* <DataTable data={exercise} /> */}
    </Item>
  );
}
