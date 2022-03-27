import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { today } from "../../../utils/date";
import { Item } from "../../../components/styleds";

export default function ExerciseHeaderTrainerInfo() {
  return (
    <Item>
      <Box>
        <Typography>{today()}</Typography>
      </Box>
      <Box>기타 정보</Box>
    </Item>
  );
}
