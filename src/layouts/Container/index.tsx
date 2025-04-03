import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

// component: 레이아웃 //
export default function Container() {


    // render: 레이아웃 렌더링 //
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}