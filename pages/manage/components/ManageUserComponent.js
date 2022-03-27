import { Stack } from "@mui/material";
import BluegymAutocomplete from "../../../components/bluegymAutocomplete";
import BluegymButton from "../../../components/bluegymButton";
import { useRouter } from "next/router";

export default function ManageUserComponent({
  data,
  loading,
  member,
  handleClick,
}) {
  const { push } = useRouter();

  const handleAddExercise = (e) => {
    push(`/manage/edit/${member.id}`);
  };
  return (
    <Stack direction="row" spacing={2}>
      <BluegymAutocomplete
        loading={loading}
        placeholder="회원을 선택해주세요"
        options={data}
        value={member}
        onChange={handleClick}
        getOptionLabel={({ name }) => name}
      />
      {member && (
        <BluegymButton onClick={handleAddExercise}>운동 추가</BluegymButton>
      )}
    </Stack>
  );
}
