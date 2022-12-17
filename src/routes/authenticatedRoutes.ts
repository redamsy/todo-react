import { lazy } from "react";

const routes = [
  {
    path: "",
    component: lazy(() => import("../Pages/Home")),
    exact: true,
  },
  {
    path: "todos",
    component: lazy(() => import("../Pages/ToDoPage")),
    exact: true,
  },
];

export default routes;
