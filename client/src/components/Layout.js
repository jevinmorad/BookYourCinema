import { Outlet, useNavigate, Link } from "react-router-dom"

export default function Layout() {
    const navigate = useNavigate();
    return (
        <>
            <nav>
                <div className={`navbar container px-3`}>
                    <div className={`container-fluid`}>
                        <a className={`navbar-brand`}>Navbar</a>
                        <form className={`d-flex col-md-5`} role="search">
                            <input className={`form-control me-2`} type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <button className={`btn btn-danger text-white`} type="signup" onClick={() => navigate('/login')}>Sign In</button>
                    </div>
                </div>
                <div className={`links`} style={{ width: "100%", backgroundColor: "#f5f5f5" }}>
                    <div className={`container my-3 `}>
                        <ul className={`nav d-flex justify-content-between`}>
                            <li className={`nav-item`}>
                                <Link className={`nav-link text-dark`} to="/">Movies</Link>
                            </li>
                            <li className={`nav-item`}>
                                <a className={`nav-link text-dark`} href="#">ListYourShow</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="menu">
                <Outlet/>
            </div>
        </>
    )
}
