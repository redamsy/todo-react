import { AxiosResponse } from "axios";
import otherAxios from "../interceptors/otherAxios";
import { IToDoBody, ToDo } from "../models/ToDo";

export const getCurrentUserToDos = async (): Promise<AxiosResponse<ToDo[]>> => {
  const resp = await otherAxios.get<ToDo[]>("/todo");

  return resp;
};

export const createToDo = async (
  todo: IToDoBody
): Promise<AxiosResponse<ToDo>> => {
  const resp = await otherAxios.post<ToDo>("/todo", todo);
  return resp;
};

export const updateCurrentUserToDo = async (
  todo: IToDoBody
): Promise<AxiosResponse<ToDo>> => {
  const resp = await otherAxios.put<ToDo>(`/todo/${todo.id}`, todo);
  return resp;
};

export const deleteCurrentUserToDo = async (
  toDoId: string
): Promise<AxiosResponse<ToDo>> => {
  const resp = await otherAxios.delete(`/todo/${toDoId}`);

  return resp;
};
