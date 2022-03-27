import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Item } from "../../../components/styleds";
import useTodayExercises from "../../../effects/useTodayExercises";
import ManageTodayExerciseModal from "./ManageTodayExerciseModal";

export default function ManageExercisesComponent({
  member,
  start: startDate,
  end: endDate,
}) {
  const { data, loading } = useTodayExercises(
    member,
    startDate,
    endDate
  );

  const [modal, setModal] = useState({
    open: false,
  });
  const handleExerciseClick = (e, item) => {
    setModal({
      open: true,
      member,
      item,
    });
  };
  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  if (!member) {
    return <ExerciseCard title="회원을 선택해주세요" />;
  }
  if (!data?.length) {
    return <ExerciseCard title="운동이 업습니다" />;
  }
  return (
    <>
      <Typography sx={{ mb: 1 }}>
        운동 리스트
        {loading && <CircularProgress size={5} />}
      </Typography>
      <Grid container spacing={2}>
        {data.map((d) => (
          <ExerciseCard
            key={d.key}
            item={d}
            handleClick={handleExerciseClick}
          />
        ))}
      </Grid>
      {modal.open && (
        <ManageTodayExerciseModal
          modal={modal}
          handleClose={handleCloseModal}
          // handleModal={handleModal}
        />
      )}
    </>
  );
}

function ExerciseCard({ item, title, handleClick }) {
  if (!item) {
    return (
      <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
        <Item
          sx={{
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>{title}</Typography>
        </Item>
      </Grid>
    );
  }
  const { key, values } = item;
  return (
    <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
      <Item
        sx={{
          minHeight: 200,
          cursor: "pointer",
          "&:hover": { backgroundColor: "#424649" },
        }}
        onClick={(e) => handleClick(e, item)}
      >
        <Typography>
          <Box component="span" sx={{ fontWeight: 700 }}>
            {key}
          </Box>{" "}
          운동
        </Typography>
        {values?.map(({ name }, i) => (
          <Box key={i}>{name}</Box>
        ))}
      </Item>
    </Grid>
  );
}
