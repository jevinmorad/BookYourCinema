import { Outlet, Link } from "react-router-dom";
import AdminAuth from "../Auth/AdminAuth";

function AdminLayout() {
    return (
        <>
            <nav>
                <div className={`navbar container px-3`}>
                    <div className={`container-fluid`}>
                        {/* Logo */}
                        <a className={`navbar-brand`}>Navbar</a>

                        {/* Sign In */}
                        <div className="SignIn">
                            <AdminAuth />
                        </div>

                    </div>
                </div>

                {/* links */}
                <div className={`links`} style={{ width: "100%", backgroundColor: "#f5f5f5" }}>
                    <div className={`container my-3 `}>
                        <ul className={`nav d-flex justify-content-between`}>
                            <li className={`nav-item`}>
                                <Link className={`nav-link text-dark`} to="/">Movies</Link>
                            </li>   
                        </ul>
                    </div>
                </div>
            </nav >
            <div className="menu">
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout