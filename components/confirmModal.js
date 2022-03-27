import { Box, Button, Modal, Backdrop } from "@mui/material";
import { modalStyle } from "./styleds";

export default function ConfirmModal({
  type,
  modal,
  handleSubmit,
  handleClose,
}) {
  const text = {
    create: "생성 하시겠습니까?",
    update: "수정 하시겠습니까?",
    delete: "삭제 하시겠습니까?",
  };
  const handleModalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };
  return (
    <Modal
      hideBackdrop
      open={modal.open}
      onClose={handleClose}
      aria-labelledby="child-modal-confirm"
      aria-describedby="child-modal-confirm"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <form onSubmit={handleModalSubmit}>
        <Box sx={{ ...modalStyle, width: 200 }}>
          <h2 id="child-modal-title">{text[type]}</h2>
          <Button variant="contained" color="primary" type="submit">
            확인
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            취소
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
