import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Footer from "./FooterSection/Footer";

const MainLayout = () => {
    return (
        <div>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
        </div>
    );
};

export default MainLayout;