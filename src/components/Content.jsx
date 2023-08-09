import Header from "./Header";
import VersesContainer from "./VersesContainer";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <main className="content">
      <Header />
      <Outlet />
    </main>
  );
};

export default Content;
