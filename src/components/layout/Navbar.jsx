import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

const NavbarLayout = ({ path = '/', title, subtitle, children }) => {
    const { logout } = useAuth();

    return (<>
        <div className="d-flex">
            <aside className="sidebar-container d-none d-lg-block">
                <Sidebar path={path} onLogout={logout}/>
            </aside>

            <div className="main-content flex-grow-1">
                <Header
                    title={title}
                    subtitle={subtitle}
                    actionButton={<button className="btn border-0 btn-outline-primary text-light" data-bs-toggle="offcanvas" data-bs-target="#sidebar-offcanvas">
                        <i className="bi bi-list fs-3"></i>
                    </button>}
                />
                {children}
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebar-offcanvas" >
                <Sidebar path={path} onLogout={logout}/>
            </div>


        </div>
    </>);
}

export default NavbarLayout;