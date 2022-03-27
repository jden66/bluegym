import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { getMonth, getWeek } from "date-fns";
import { useState } from "react";
import BluegymDatepicker from "../../../components/bluegymDatepicker";
import { formatDate } from "../../../utils/date";

export default function ManageDateComponent({
  range,
  handleClick,
  startTime,
  endTime,
  handlePickerChange,
}) {
  const [popover, setPopover] = useState({
    anchorEl: null,
    open: false,
  });

  const handleOpen = (e) => {
    setPopover({
      ...popover,
      open: true,
      anchorEl: e.currentTarget,
      pickerOption: {
        inline: true,
        selectsRange: true,
        onChange: handlePickerChange,
      },
    });
  };

  const handleClose = () => {
    setPopover({ ...popover, open: false });
  };
  return (
    <>
      <Typography>일자 선택</Typography>
      <Stack direction="row" flexWrap="wrap">
        <ButtonGroup variant="contained" sx={{ mb: 3, mr: 3, width: 350 }}>
          <Button
            color={range === "month" ? "secondary" : "primary"}
            onClick={(e) => handleClick("month")}
          >
            이번 달({getMonth(new Date()) + 1}월)
          </Button>
          <Button
            color={range === "week" ? "secondary" : "primary"}
            onClick={(e) => handleClick("week")}
          >
            이번 주({getWeek(new Date()) - 1}주차)
          </Button>
          <Button
            color={range === "range" ? "secondary" : "primary"}
            onClick={(e) => handleClick("range")}
          >
            범위 선택
          </Button>
        </ButtonGroup>
        {range === "range" && (
          <Box sx={{ width: 340 }}>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ width: 318 }}
            >
              {formatDate(startTime)} ~ {endTime ? formatDate(endTime) : ""}
            </Button>
            <BluegymDatepicker
              {...popover}
              startDate={startTime}
              endDate={endTime}
              handleClose={handleClose}
            />
          </Box>
        )}
      </Stack>
    </>
  );
}
