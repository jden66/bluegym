import { Autocomplete, TextField } from "@mui/material";

export default function BluegymAutocomplete({ ...rest }) {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      size="small"
      renderInput={(params) => <TextField {...params} />}
      {...rest}
    />
  );
}
