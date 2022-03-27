import { Box, Container } from "@mui/material";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Box className={"content"} sx={{ bgcolor: "#121212" }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </>
  );
}
