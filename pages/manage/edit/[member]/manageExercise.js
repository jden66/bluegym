import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BluegymButton from "../../../../components/bluegymButton";
import BluegymPicker from "../../../../components/bluegymPicker";
import AppContext from "../../../../core/contexts/AppContext";
import { formatDate } from "../../../../utils/date";
import AutocompleteExercise from "../components/manageAutocompleteMember";
import TypedExerciseList from "../components/manageEditExercises";

export default function ManageExercise({
  member,
  loading,
  userExercises,
  handleSubmit,
}) {
  const trainer = useContext(AppContext);
  const { back } = useRouter();
  const [exercises, setExercises] = useState(userExercises);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectedDate = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleExercises = (newExercises) => {
    setExercises(newExercises);
  };

  const handleAutocompleteClick = (e, exercise) => {
    if (!exercise) {
      return;
    }
    if (exercises.findIndex((e) => e.name === exercise.name) !== -1) {
      enqueueSnackbar("이미 존재하는 운동입니다", { variant: "warning" });
      return;
    }
    const copyExercises = [...exercises];
    handleExercises([...copyExercises, exercise]);
  };

  const handleExerciseChange = (e) => {
    const { name, value } = e.target;
    const seq = name.split("-")[3];
    const copyExercises = [...exercises];
    const findExerciseIndex = copyExercises.findIndex(
      (exercise) => exercise.seq === +seq
    );
    copyExercises[findExerciseIndex].exercise_desc = value;

    handleExercises([...copyExercises]);
  };
  const handleExerciseDelete = (e, exercise) => {
    const copyExercises = [...exercises];
    const indexExercise = copyExercises.findIndex(
      (e) => e.seq === exercise.seq
    );
    copyExercises.splice(indexExercise, 1);
    handleExercises([...copyExercises]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const copyExercises = [...exercises];
    // console.log(memberId, user, saveExercises);
    const info = {
      member_id: member.id,
      trainer_id: trainer.id,
      group_name: trainer.group,
      date: formatDate(selectedDate, "yyyy-MM-dd"),
      exercise_type: trainer.data.exercise.type,
    };
    const d = copyExercises.map((exercise) => ({
      ...info,
      ...exercise,
    }));
    // console.log(d);
    handleSubmit(d);
  };

  useEffect(() => {
    if (!loading && userExercises.length) {
      // console.log(loading, userExercises)
      handleExercises(userExercises[0].values);
    }
  }, [userExercises, loading]);

  return (
    <Stack sx={{ color: "white" }} spacing={2}>
      <Box display="flex" alignItems="center">
        <Typography>{member?.name} 회원 오늘의 운동 생성</Typography>
        <BluegymButton color="error" sx={{ m: "0 3px" }} onClick={() => back()}>
          취소
        </BluegymButton>
        <BluegymButton color="primary" onClick={onSubmit}>
          저장
        </BluegymButton>
      </Box>
      <Box>
        <Typography sx={{ mb: 1 }}>일자 선택</Typography>
        {/* <BluegymDatepicker /> */}
        <BluegymPicker
          value={formatDate(selectedDate, "yyyy-MM-dd")}
          onChange={handleSelectedDate}
        />
      </Box>
      <Box>
        <Typography sx={{ mb: 1 }}>운동 추가</Typography>
        <Box>
          <AutocompleteExercise
            trainer={trainer}
            handleClick={handleAutocompleteClick}
          />
        </Box>
        <Box>
          {/* {exercises.map((exercise) => (
    <Box key={exercise.id}>{exercise.name}</Box>
  ))} */}
          {trainer && (
            <TypedExerciseList
              trainer={trainer}
              exercises={exercises}
              handleTypedDescChange={handleExerciseChange}
              handleTypedDescDelete={handleExerciseDelete}
            />
          )}
        </Box>
      </Box>
    </Stack>
  );
}
