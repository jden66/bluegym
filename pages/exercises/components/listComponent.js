import { Chip, List, ListItemText, Stack } from "@mui/material";
import { StyledListItem } from "../../../components/styleds";

export default function ListComponent({ items, handleClick }) {
  return (
    <List>
      {items?.map((item) => (
        <ListComponentItem
          key={item.seq}
          item={item}
          handleClick={handleClick}
        />
      ))}
    </List>
  );
}

function ListComponentItem({ item, handleClick }) {
  const label = item.category === "" ? "-" : item.category;
  return (
    // <StyledListItem onClick={(e) => handleClick(e, "update", item)}>
    <StyledListItem onClick={(e) => handleClick(e, "view", item)}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Chip label={label} sx={{ width: 50, maxWidth: 100 }} />
        <ListItemText>{item.name}</ListItemText>
      </Stack>
    </StyledListItem>
  );
}
