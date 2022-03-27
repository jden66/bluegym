import { Popover } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Item } from "./styleds";

export default function BluegymDatepicker({
  open,
  handleClose,
  anchorEl,
  pickerOption,
  startDate,
  endDate,
  handleChange,
}) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Item>
        {/* <DatePicker {...pickerOption} /> */}
        <DatePicker
          {...pickerOption}
          startDate={startDate}
          endDate={endDate}
        />
      </Item>
    </Popover>
  );
}
