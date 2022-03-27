import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import AppContext from "../../../core/contexts/AppContext";
import { formatDate } from "../../../utils/date";
import BluegymButton from "../../../components/bluegymButton";
import { modalStyle } from "../../../components/styleds";

export default function UserModal({ modal, handleClose, handleModal }) {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();
  const user = useContext(AppContext);
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const initializeState = () => {
    setName("");
  };

  const closeProcess = () => {
    initializeState();
    handleClose();
    mutate(["/getMembers", user.id]);
  };

  const validateForm = () => {
    if (name === "") {
      enqueueSnackbar("이름을 입력해주세요", {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return true;
    }
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      return true;
    }
    try {
      await axios.patch(`/member/${modal?.item.id}`, { name });
      enqueueSnackbar("회원 수정 성공", { variant: "success" });
      closeProcess();
    } catch (error) {
      enqueueSnackbar("회원 수정 실패", { variant: "error" });
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      return true;
    }
    try {
      await axios.post(`/member`, {
        name,
        group: user.group,
        trainer: user.id,
      });
      enqueueSnackbar("회원 생성 성공", { variant: "success" });
      closeProcess();
    } catch (error) {
      enqueueSnackbar("회원 생성 실패", { variant: "error" });
    }
  };

  const handleUserDelete = async (e) => {
    try {
      await axios.delete(`/member/${modal?.item.id}`);
      enqueueSnackbar("회원 삭제 성공", { variant: "success" });
      closeProcess();
    } catch (error) {
      enqueueSnackbar("회원 삭제 실패", { variant: "error" });
    }
  };

  const handleSubmitFunc = () => {
    if (modal?.type === "update") {
      return handleSubmitUpdate;
    }
    if (modal?.type === "create") {
      return handleSubmitCreate;
    }
  };

  useEffect(() => {
    if (modal?.type === "update") {
      const { name } = modal?.item;
      setName(name);
    }
    if (!modal?.open) {
      initializeState();
    }
  }, [modal]);

  return (
    <Modal
      open={modal?.open}
      onClose={() => handleClose()}
      aria-labelledby={`user-${modal?.type}-modal`}
      // aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmitFunc()}>
        <Box sx={modalStyle}>
          {modal?.type === "view" && <UserView user={modal?.item} />}
          {modal?.type === "create" && (
            <>
              <Typography color="white" sx={{ mb: 2 }}>
                회원 추가
              </Typography>
              <UserCreateView name={name} handleChange={handleNameChange} />
            </>
          )}
          {modal?.type === "update" && (
            <>
              <Typography color="white" sx={{ mb: 2 }}>
                {modal?.item.name} 회원 수정
              </Typography>
              <UserUpdateView
                user={modal?.item}
                name={name}
                handleChange={handleNameChange}
              />
            </>
          )}
          <Stack direction="row">
            {modal?.type === "view" && (
              <>
                <BluegymButton color="error" onClick={handleUserDelete}>
                  삭제
                </BluegymButton>
                <BluegymButton
                  color="warning"
                  sx={{ margin: "0 10px" }}
                  onClick={(e) => handleModal(e, "update")}
                >
                  수정
                </BluegymButton>
                <BluegymButton color="primary" onClick={handleClose}>
                  닫기
                </BluegymButton>
              </>
            )}
            {modal?.type === "update" && (
              <>
                <BluegymButton
                  color="warning"
                  onClick={(e) => handleModal(e, "view")}
                >
                  취소
                </BluegymButton>
                <BluegymButton
                  color="primary"
                  sx={{ margin: "0 10px" }}
                  // onClick={(e) => handleModal(e, "view")}
                  type="submit"
                >
                  수정
                </BluegymButton>
                {/* <BluegymButton color="error" onClick={handleClose}>
                  닫기
                </BluegymButton> */}
              </>
            )}
            {modal?.type === "create" && (
              <>
                <BluegymButton
                  color="warning"
                  onClick={(e) => handleModal(e, "view")}
                >
                  취소
                </BluegymButton>
                <BluegymButton
                  color="primary"
                  sx={{ margin: "0 10px" }}
                  // onClick={(e) => handleModal(e, "view")}
                  type="submit"
                >
                  추가
                </BluegymButton>
              </>
            )}
          </Stack>
        </Box>
      </form>
    </Modal>
  );
}

function UserView({ user }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack>
        <UserViewItem title="사용자 이름" text={user.name} />
        <UserViewItem
          title="사용자 등록일"
          text={formatDate(user.created_at)}
        />
        <UserViewItem title="사용자 소속" text={user.group} />
      </Stack>
    </Box>
  );
}

function UserViewItem({ title, text }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ color: "white", fontWeight: 600 }}>{title}</Typography>
      <Typography sx={{ color: "white" }}>{text}</Typography>
    </Box>
  );
}
function UserUpdateView({ name, handleChange }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack>
        <TextField value={name} onChange={handleChange} />
      </Stack>
    </Box>
  );
}

function UserCreateView({ name, handleChange }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack>
        <TextField
          value={name}
          onChange={handleChange}
          placeholder="회원 이름"
        />
      </Stack>
    </Box>
  );
}
