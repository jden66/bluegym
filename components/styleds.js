import { ListItem, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Item = styled(Paper)(({ theme, ...props }) => {
  return {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  };
});

export const StyledListItem = styled(ListItem)(({ theme }) => {
  return {
    "&:hover": { backgroundColor: theme.palette.action.hover, borderRadius: 5 },
  };
});

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
