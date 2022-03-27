import { Button } from "@mui/material";

export default function BluegymButton({
  color = "primary",
  handleClick,
  children,
  ...rest
}) {
  return (
    <Button variant="contained" color={color} onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
}
