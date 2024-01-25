import { Routes, Route } from "react-router-dom";

import HomePage from "./components/home-page";
import CallPage from "./components/call-page";

const routes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/call/:remoteUserId",
    Component: CallPage,
  },
];

const App = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={<Component />} />;
      })}
    </Routes>
  );
};

export default App;
