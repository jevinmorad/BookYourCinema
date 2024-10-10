import { useState } from "react";
import { adminAuthRequest } from "../../api-helpers/api-helper";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../Store";

const AdminAuth = () => {
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    const dispatch = useDispatch();

    const onResReceived = (data) => {
        dispatch(adminActions.login());
        localStorage.setItem('adminId', data._id);
        localStorage.setItem('token', data.token);
    }
    const [showModal, setShowModal] = useState(true);

    const handleAuthSubmit = (inputData, isSignIn) => {
        adminAuthRequest(inputData, isSignIn)
            .then(onResReceived)
            .catch((err) => console.error(err))
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleLogout = () => dispatch(adminActions.logout());

    return (
        <>
            {isAdminLoggedIn ?
                (<button onClick={handleLogout} className="btn btn-danger">Log out</button>) :
                (<button onClick={handleShow} className="btn btn-danger">Sign in</button>)
            }

            <AuthForm
                onSubmit={handleAuthSubmit}
                showModal={!isAdminLoggedIn}
                handleClose={handleClose}
            />

        </>
    );
};

export default AdminAuth;
