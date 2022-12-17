import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBarWrapper from "../../Components/AppBarWrapper";
import ToDoListWrapper from "../../Components/ToDoListWrapper";

export default function ToDoPage(): JSX.Element {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <AppBarWrapper
        pageName="To Do List"
        buttonIcon={<HomeIcon />}
        buttonPath="">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ListAltIcon />
            </Avatar>
            <ToDoListWrapper />
          </Box>
        </Container>
      </AppBarWrapper>
    </ThemeProvider>
  );
}
