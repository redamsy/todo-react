import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosResponse } from "axios";
import { IToDoBody, ToDo } from "../models/ToDo";
import {
  createToDo,
  deleteCurrentUserToDo,
  getCurrentUserToDos,
  updateCurrentUserToDo,
} from "../actions/todo";

export interface IAppActions {
  createToDo: (conferenceGallery: IToDoBody) => Promise<AxiosResponse<ToDo>>;
  updateCurrentUserToDo: (todo: IToDoBody) => Promise<AxiosResponse<ToDo>>;
  getCurrentUserToDos: () => Promise<AxiosResponse<ToDo[]>>;
  deleteCurrentUserToDo: (toDoId: string) => Promise<AxiosResponse<ToDo>>;
}

export const AppActionsContext = createContext<IAppActions | undefined>(
  undefined
);
export const useAppActions = () => useContext(AppActionsContext);

export const AppActionsProvider = ({ children }: { children: ReactNode }) => {
  const [appActions, setAppActions] = useState<IAppActions>();

  function configureAppActions(): IAppActions {
    return {
      createToDo,
      updateCurrentUserToDo,
      getCurrentUserToDos,
      deleteCurrentUserToDo,
    };
  }

  useEffect(() => {
    const actions = configureAppActions();
    setAppActions(actions);
  }, []);

  return (
    <AppActionsContext.Provider value={appActions}>
      {children}
    </AppActionsContext.Provider>
  );
};
