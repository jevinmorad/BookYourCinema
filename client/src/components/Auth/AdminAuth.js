import { useState } from "react";
import { adminAuthRequest } from "../../api-helpers/api-helper";
import AuthForm from "./AuthForm";

const AdminAuth = () => {
    const [showModal, setShowModal] = useState(true);

    const handleAuthSubmit = async (inputData, isSignIn) => {
        adminAuthRequest(inputData, isSignIn)
            .catch((err) => console.error(err))
    };

    const handleClose = () => setShowModal(false);

    return (
        <AuthForm
            onSubmit={handleAuthSubmit}
            isUser={false}
            showModal={showModal}
            handleClose={handleClose}
        />
    );
};

export default AdminAuth;
