import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
const HomeLayout = () => {
  return (
    <div className="max-w-[1700px] mx-auto min-h-screen flex flex-col bg-base-200">
      <Header></Header>
      <main className="flex-1  bg-gradient-to-r from-slate-50 via-white to-slate-50 text-slate pb-12">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default HomeLayout;
