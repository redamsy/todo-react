import React, { memo, useEffect, useState } from "react";

import { useAppActions } from "../Providers/actionsProvider";
import { ToDo } from "../models/ToDo";
import ToDoList from "./ToDoList";
import moment from "moment";

export type ToDosGroupedByDay = {
  day: Date;
  toDos: ToDo[];
};

// eslint-disable-next-line react/display-name
const ToDoListWrapper = memo(() => {
  const appActions = useAppActions();

  const [remainingToDosGroupedByDay, setRemainingToDosGroupedByDay] = useState<
    ToDosGroupedByDay[]
  >([]);
  const [finishedToDosGroupedByDay, setFinishedToDosGroupedByDay] = useState<
    ToDosGroupedByDay[]
  >([]);
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function getToDosGroupedByDay(toDos: ToDo[]): ToDosGroupedByDay[] {
    return toDos
      .reduce((acc: ToDosGroupedByDay[], toDo: ToDo) => {
        const newDate = new Date(toDo.date);
        const date = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate()
        );
        const foundIndex = acc.findIndex((d) => {
          return d.day.getTime() === date.getTime();
        });

        if (foundIndex === -1) {
          acc.push({
            day: date,
            toDos: [toDo],
          });
        } else {
          const dayDetails = acc[foundIndex];
          dayDetails.toDos.push(toDo);
        }
        return acc;
      }, [] as ToDosGroupedByDay[])
      .sort((a, b) => moment(a.day).unix() - moment(b.day).unix());
  }

  const getToDos = async () => {
    if (appActions) {
      setLoading(true);
      const res = await appActions.getCurrentUserToDos();
      const remaining = getToDosGroupedByDay(
        res.data.filter((toDo) => !toDo.completed)
      );
      const finsihed = getToDosGroupedByDay(
        res.data.filter((toDo) => toDo.completed)
      );
      setRemainingToDosGroupedByDay(remaining);
      setFinishedToDosGroupedByDay(finsihed);
      setToDos(res.data);
      setLoading(false);
    } else console.log("appActions not initialized");
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <ToDoList
      toDos={toDos}
      remainingToDosGroupedByDay={remainingToDosGroupedByDay}
      finishedToDosGroupedByDay={finishedToDosGroupedByDay}
      loading={loading}
      getToDos={getToDos}
    />
  );
});

export default ToDoListWrapper;
