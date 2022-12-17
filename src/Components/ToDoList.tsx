import React, { memo, useState } from "react";
import CircularProgressPage from "./CircularProgressPage";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { IToDoBody, ToDo } from "../models/ToDo";
import { useAppActions } from "../Providers/actionsProvider";
import DeleteDialog from "./DeleteDialog";
import UpdateToDoModal from "./UpdateToDoModal";
import CreateToDoModal from "./CreateToDoModal";
import { ToDosGroupedByDay } from "./ToDoListWrapper";
import {
  AppBar,
  createTheme,
  Divider,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import SwitchRemainingFinished from "./SwitchRemainingFinished";
import ToDoListItem from "./ToDoListItem";
import moment from "moment";

function appBarLabel(label: string) {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

interface Props {
  toDos: ToDo[];
  remainingToDosGroupedByDay: ToDosGroupedByDay[];
  finishedToDosGroupedByDay: ToDosGroupedByDay[];
  loading: boolean;
  getToDos: () => Promise<void>;
}

// eslint-disable-next-line react/display-name
const AbstractCarousel = memo(
  ({
    toDos,
    remainingToDosGroupedByDay,
    finishedToDosGroupedByDay,
    loading,
    getToDos,
  }: Props) => {
    const appActions = useAppActions();

    const [createOpen, setCreateOpen] = useState(false);
    const [toDoToUpdate, setToDoToUpdate] = useState<ToDo | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [idToDelete, setIdToDelete] = React.useState<string>("");
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleDeleteOpen = (id: string) => {
      setIdToDelete(id);
      setOpenAlert(true);
    };
    const handleDeleteClose = () => {
      setOpenAlert(false);
    };

    const handleRemoveToDo = async (id: string) => {
      if (appActions) {
        await appActions.deleteCurrentUserToDo(id);
        await getToDos();
        handleDeleteClose();
      }
    };

    const handleCreateOpen = () => {
      setCreateOpen(true);
    };

    const handleCreateClose = () => {
      setCreateOpen(false);
    };

    const handleUpdateClose = () => {
      setUpdateOpen(false);
      setToDoToUpdate(null);
    };

    const handleUpdateOpen = async (toDo: ToDo) => {
      setToDoToUpdate(toDo);
      setUpdateOpen(true);
    };

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    async function handleMarkAsCompleted(data: ToDo) {
      const { completed, ...rest } = data;
      const payload: IToDoBody = {
        completed: true,
        ...rest,
      };
      if (appActions) {
        const { status } = await appActions.updateCurrentUserToDo(payload);
        if (status === 200) {
          alert("marked to-do as completed successfully ");
          await getToDos();
        } else {
          alert("Failed to marked to-do as completed");
        }
      }
    }

    const toDosComp = (toDosGroupedByDay: ToDosGroupedByDay[]) => (
      <>
        {toDosGroupedByDay.map((group) => {
          const { day, toDos } = group;
          return (
            <>
              <ThemeProvider theme={darkTheme}>
                <AppBar
                  position="static"
                  color="primary"
                  key={day.toLocaleDateString()}>
                  {appBarLabel(day.toLocaleDateString())}
                </AppBar>
              </ThemeProvider>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}>
                {toDos
                  .sort((a, b) => {
                    if (a.priority < b.priority) {
                      return -1;
                    }
                    if (a.priority > b.priority) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((toDo) => (
                    <ToDoListItem
                      key={toDo.id}
                      toDo={toDo}
                      handleUpdateOpen={handleUpdateOpen}
                      handleDeleteOpen={handleDeleteOpen}
                      handleMarkAsCompleted={handleMarkAsCompleted}
                    />
                  ))}
              </List>
            </>
          );
        })}
      </>
    );
    return (
      <>
        {loading ? (
          <CircularProgressPage />
        ) : (
          <>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}>
              <IconButton
                style={{ marginBottom: "20px" }}
                edge="end"
                aria-label="edit"
                onClick={() => {
                  handleCreateOpen();
                }}>
                <AddIcon />
              </IconButton>
              <SwitchRemainingFinished
                checked={checked}
                handleChange={handleChange}
              />
            </List>
            <Divider />
            {checked
              ? toDosComp(remainingToDosGroupedByDay)
              : toDosComp(finishedToDosGroupedByDay)}
          </>
        )}
        {createOpen && (
          <CreateToDoModal
            open={createOpen}
            onClose={handleCreateClose}
            getToDos={getToDos}
          />
        )}
        {toDoToUpdate && (
          <UpdateToDoModal
            open={updateOpen}
            onClose={handleUpdateClose}
            toDo={toDoToUpdate}
            getToDos={getToDos}
          />
        )}
        <DeleteDialog
          open={openAlert}
          onCancel={() => handleDeleteClose()}
          onDelete={() => handleRemoveToDo(idToDelete)}
        />
      </>
    );
  }
);

export default AbstractCarousel;
