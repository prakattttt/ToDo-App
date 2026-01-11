import { Outlet } from "react-router-dom";
import Head from "../components/Head.jsx";

const MainLayout = () => {
  return (
    <>
      <Head />
      <Outlet />
    </>
  );
};

export default MainLayout;
