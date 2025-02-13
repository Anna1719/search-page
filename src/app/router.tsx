import { createBrowserRouter } from "react-router-dom";
import { SearchPage } from "@/pages/searchPage";
import { CharacterPage } from "@/pages/characterPage";

export const ROUTES = {
  HOME: "/",
  CHARACTER: "/character/:id",
};

export const routes = [
  {
    path: ROUTES.HOME,
    element: <SearchPage />,
  },
  {
    path: ROUTES.CHARACTER,
    element: <CharacterPage />,
  },
];

export const router = createBrowserRouter(routes);