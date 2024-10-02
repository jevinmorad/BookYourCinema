import { Outlet, Link } from "react-router-dom"
import SignIn from './Auth/AuthForm'

export default function Layout() {
    return (
        <>
            <nav>
                <div className={`navbar container px-3`}>
                    <div className={`container-fluid`}>
                        {/* Logo */}
                        <a className={`navbar-brand`}>Navbar</a>

                        {/* Search */}
                        <form className={`d-flex col-md-5`} role="search">
                            <input className={`form-control me-2`} type="search" placeholder="Search" aria-label="Search" />
                        </form>

                        {/* Sign In */}
                        <div className="SignIn">
                            <SignIn/>
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
                            <li className={`nav-item`}>
                                <a className={`nav-link text-dark`} href="#">ListYourShow</a>
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
