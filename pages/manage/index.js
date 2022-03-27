import { Box, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AppContext from "../../core/contexts/AppContext";
import useMembers from "../../effects/useMembers";
import PageHeader from "../../components/pageHeader";
import { getRangeOfThisWeek, getRangeOfThisMonth } from "../../utils/date";
import ManageDateComponent from "./components/ManageDateComponent";
import ManageUserComponent from "./components/ManageUserComponent";
import ManageExercisesComponent from "./components/ManageExercisesComponent";

export default function Manage() {
  const loginUser = useContext(AppContext);
  const { data, loading, error } = useMembers(loginUser?.id);
  const { start, end } = getRangeOfThisWeek();
  const [startTime, setStartTime] = useState(start);
  const [endTime, setEndTime] = useState(end);

  const [selectMember, setSelectMember] = useState(null);
  const handleSelectMember = (e, member) => {
    setSelectMember(member);
    // push(`/manage${member ? `?user=${member.id}` : ""}`);
  };

  const [range, setRange] = useState("week");
  const handleSelectRange = (r) => {
    let dateRange = getRangeOfThisMonth("yyyy-MM-dd");
    if (r === "week" || r === "range") {
      dateRange = getRangeOfThisWeek(r === "range" ? null : "yyyy-MM-dd");
    }
    setRange(r);
    setStartTime(dateRange.start);
    setEndTime(dateRange.end);
  };
  const handleCustomRange = ([start, end]) => {
    setStartTime(start);
    setEndTime(end);
  };
  
  return (
    <>
      <PageHeader title="회원 운동 관리" />
      <Typography sx={{ color: "white", mb: 1 }}>회원 운동 관리</Typography>
      <Stack spacing={2} sx={{ color: "white" }}>
        <Box>
          <ManageUserComponent
            data={data}
            loading={loading}
            member={selectMember}
            handleClick={handleSelectMember}
          />
        </Box>
        <Box>
          <ManageDateComponent
            range={range}
            startTime={startTime}
            endTime={endTime}
            handlePickerChange={handleCustomRange}
            handleClick={handleSelectRange}
          />
        </Box>
        <Box>
          <ManageExercisesComponent
            member={selectMember}
            start={startTime}
            end={endTime}
          />
        </Box>
      </Stack>
    </>
  );
}
