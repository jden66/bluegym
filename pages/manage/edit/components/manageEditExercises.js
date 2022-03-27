import { DeleteForever } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import classNames from "classnames";
import { Fragment } from "react";
import BluegymButton from "../../../../components/bluegymButton";

export default function TypedExerciseList({
  trainer,
  exercises,
  handleTypedDescChange,
  handleTypedDescDelete,
}) {
  if (trainer?.data.exercise.type?.toString() === "1" && exercises?.length) {
    return (
      <>
        <TypedDescExerciseList
          exercises={exercises}
          handleChange={handleTypedDescChange}
          handleDelete={handleTypedDescDelete}
        />
      </>
    );
  }
  return <Typography>운동을 추가해주세요</Typography>;
}

function TypedDescExerciseList({ exercises, handleChange, handleDelete }) {
  return (
    <>
      <Typography>오늘의 운동 리스트</Typography>
      {exercises.map((exercise) => (
        <Fragment key={exercise.seq}>
          <Typography fontWeight={700}>{exercise.name}</Typography>
          <Box key={exercise.seq} display="flex" alignItems="center">
            <TextField
              rows={5}
              name={`today-exercise-input-${exercise.seq}`}
              size="small"
              fullWidth
              sx={{ mr: 10, maxWidth: 500 }}
              onChange={handleChange}
              value={exercise.exercise_desc}
              type="text"
              className={classNames(`today-exercise-input`)}
            />
            <BluegymButton
              size="small"
              color="error"
              onClick={(e) => handleDelete(e, exercise)}
            >
              <DeleteForever />
            </BluegymButton>
          </Box>
        </Fragment>
      ))}
    </>
  );
}
