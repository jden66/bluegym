import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AppContext from "../../core/contexts/AppContext";
import useMembers from "../../effects/useMembers";
import { formatDate } from "../../utils/date";
import BluegymTable from "../../components/BluegymTable";
import PageHeader from "../../components/pageHeader";
import MemberModal from "./components/memberModal";

const columns = [
  { id: "id", label: "ID", align: "center", minWidth: 170 },
  { id: "name", label: "이름", align: "center", minWidth: 170, type: "string" },
  {
    id: "created_at",
    label: "등록일",
    minWidth: 170,
    align: "center",
    format: (value) => formatDate(value),
    type: "date",
  },
];

export default function Users() {
  const user = useContext(AppContext);
  const { data, error, loading } = useMembers(user?.id);
  const [modal, setModal] = useState({
    open: false,
    type: "view",
  });
  const handleClose = () => {
    setModal({ ...modal, open: false });
  };

  const handleModal = (e, type) => {
    setModal({ ...modal, type });
  };

  const handleUserClick = (e, user) => {
    setModal({ ...modal, open: true, item: user, type: "view" });
  };

  const openUserCreateModal = () => {
    setModal({ ...modal, open: true, type: "create" });
  };
  return (
    <>
      <PageHeader title="회원 관리" />
      <Box>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: "white" }}>
            {user && user.name}님의 회원 리스트
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={openUserCreateModal}
          >
            추가
          </Button>
        </Stack>
      </Box>
      <BluegymTable
        loading={loading}
        columns={columns}
        rows={data}
        handleRowClick={handleUserClick}
      />
      <MemberModal
        modal={modal}
        handleClose={handleClose}
        handleModal={handleModal}
      />
    </>
  );
}
