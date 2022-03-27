import { Box, Modal, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import AppContext from "../../../core/contexts/AppContext";
import { modalStyle } from "../../../components/styleds";
import BluegymButton from "../../../components/bluegymButton";

export default function ExerciseModal({ modal, handleModal, handleClose }) {
  const user = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const initializeState = () => {
    setTitle("");
    setDescription("");
    setCategory("");
  };

  const closeProcess = () => {
    mutate(["getExercise", user.id]);
    mutate(["getExerciseCount", user.id]);
    handleClose();

    initializeState();
  };

  const handleCreateExercise = async (e) => {
    e.preventDefault();
    if (title === "") {
      enqueueSnackbar("운동 이름을 입력해주세요", {
        variant: "warning",
        anchorOrigin: { horizontal: "right", vertical: "top" },
        preventDuplicate: true,
      });
      return;
    }
    try {
      const data = {
        name: title,
        desc: description,
        category,
        trainerId: user.id,
        groupId: user.group,
      };
      await axios.post("/exercise", data);
      enqueueSnackbar("운동 생성 완료", { variant: "success" });

      closeProcess();
    } catch (error) {
      enqueueSnackbar("운동 생성 실패", { variant: "error" });
    }
  };

  const handleDeleteExercise = async (e, { seq }) => {
    try {
      await axios.delete(`/exercise?id=${seq}`);
      enqueueSnackbar("운동 삭제 완료", { variant: "success" });
      closeProcess();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("운동 삭제 실패", { variant: "error" });
    }
  };

  const handleUpdateExercise = async (e) => {
    e.preventDefault();
    try {
      const data = {
        seq: modal?.item.seq,
        name: title,
        desc: description,
        category,
        trainerId: user.id,
        groupId: user.group,
      };
      await axios.patch(`/exercise`, data);
      enqueueSnackbar("운동 수정 완료", { variant: "success" });
      closeProcess();
    } catch (error) {
      enqueueSnackbar("운동 수정 실패", { variant: "error" });
    }
  };

  useEffect(() => {
    if (modal?.type === "update") {
      const { name, desc, category } = modal?.item;
      setTitle(name);
      setDescription(desc);
      setCategory(category);
    }
    if (!modal?.open) {
      initializeState();
    }
  }, [modal]);

  const handleSubmit = (e) => {
    if (modal?.type === "create") {
      return handleCreateExercise;
    }
    if (modal?.type === "update") {
      return handleUpdateExercise;
    }
  };

  const handleModalType = (e, type) => {
    handleModal(e, type);
  };
  return (
    <Modal
      open={modal?.open}
      onClose={() => handleClose()}
      aria-labelledby="exercise-create-modal"
      // aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "white" }}
        >
          {modal?.type === "create" && "운동 생성"}
          {modal?.type === "update" && "운동 수정"}
        </Typography>
        <form onSubmit={handleSubmit()}>
          {modal?.type === "view" && (
            <ExerciseModalDisplay
              title={modal?.item.name}
              description={modal?.item.desc}
              category={modal?.item.category}
              // handleUpdateView={handleUpdateView}
            />
          )}
          {(modal?.type === "update" || modal?.type === "create") && (
            <ExerciseModalUpdateView
              title={title}
              description={description}
              category={category}
              handleTitle={handleTitle}
              handleDescription={handleDescription}
              handleCategory={handleCategory}
            />
          )}

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            {modal?.type === "update" && (
              <>
                <BluegymButton
                  color="error"
                  sx={{ mr: 2 }}
                  onClick={(e) => handleModalType(e, "view")}
                >
                  취소
                </BluegymButton>
                <BluegymButton type="submit">저장</BluegymButton>
              </>
            )}
            {modal?.type === "create" && (
              <>
                <BluegymButton color="error" sx={{ mr: 2 }}>
                  취소
                </BluegymButton>
                <BluegymButton type="submit">저장</BluegymButton>
              </>
            )}

            {modal?.type === "view" && (
              <>
                <BluegymButton
                  color="warning"
                  onClick={(e) => handleDeleteExercise(e, modal?.item)}
                >
                  삭제
                </BluegymButton>
                <BluegymButton
                  color="primary"
                  onClick={(e) => handleModalType(e, "update")}
                  sx={{ margin: "0 10px" }}
                >
                  수정
                </BluegymButton>
                <BluegymButton color="error" onClick={handleClose}>
                  취소
                </BluegymButton>
              </>
            )}
          </Stack>
        </form>
      </Box>
      {/* <ConfirmModal modal={childModal} handleClose={handleCloseChildModal} /> */}
    </Modal>
  );
}

function ExerciseModalUpdateView({
  title,
  description,
  category,
  handleTitle,
  handleDescription,
  handleCategory,
}) {
  return (
    <>
      <TextField
        id="create-exercise-title"
        label="운동 이름"
        variant="outlined"
        margin="normal"
        fullWidth
        value={title}
        onChange={handleTitle}
      />
      <TextField
        id="create-exercise-description"
        multiline
        maxRows={6}
        label="운동 설명"
        variant="outlined"
        margin="normal"
        fullWidth
        value={description}
        onChange={handleDescription}
      />
      <TextField
        id="create-exercise-category"
        multiline
        maxRows={6}
        label="운동 분류"
        variant="outlined"
        margin="normal"
        fullWidth
        value={category}
        onChange={handleCategory}
      />
    </>
  );
}

function ExerciseModalDisplay({ title, description, category }) {
  return (
    <Box>
      <Stack>
        <Box>
          <Typography sx={{ color: "white", fontWeight: 600 }}>
            운동 이름
          </Typography>
          <Typography sx={{ color: "white" }}>{title}</Typography>
        </Box>
        <Box sx={{ m: "5px 0" }}>
          <Typography sx={{ color: "white", fontWeight: 600 }}>
            운동 설명
          </Typography>
          <Typography sx={{ color: "white" }}>{description}</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "white", fontWeight: 600 }}>
            운동 분류
          </Typography>
          <Typography sx={{ color: "white" }}>{category}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
