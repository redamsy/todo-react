import React, { memo, useState } from "react";
import FlagIcon from "@mui/icons-material/Flag";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { ToDo } from "../models/ToDo";

interface IProps {
  toDo: ToDo;
  handleUpdateOpen: (toDo: ToDo) => Promise<void>;
  handleDeleteOpen: (id: string) => void;
  handleMarkAsCompleted: (data: ToDo) => Promise<void>;
}
// eslint-disable-next-line react/display-name
const ToDoListItem = memo(
  ({
    toDo,
    handleUpdateOpen,
    handleDeleteOpen,
    handleMarkAsCompleted,
  }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <ListItem key={toDo.id} disableGutters>
        <ListItemText primary={`Title: ${toDo.title}`} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => {
              handleUpdateOpen(toDo);
            }}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            data-user={toDo.id}
            onClick={() => {
              handleDeleteOpen(toDo.id);
            }}>
            <DeleteIcon />
          </IconButton>
          {!isLoading && (
            <IconButton
              edge="end"
              aria-label="delete"
              data-user={toDo.id}
              onClick={async () => {
                setIsLoading(true);
                await handleMarkAsCompleted(toDo);
                setIsLoading(false);
                return;
              }}>
              <FlagIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

export default ToDoListItem;
