import { useState } from 'react';
import { userAuthRequest } from '../../api-helpers/api-helper';
import AuthForm from './AuthForm';

const UserAuth = () => {
    const [showModal, setShowModal] = useState(false);

    const handleAuthSubmit = (inputData, isSignIn) => {
        userAuthRequest(inputData, isSignIn)
            .catch((err) => console.error(err))
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <button onClick={handleShow} className="btn btn-danger">
                Sign in
            </button>

            <AuthForm
                onSubmit={handleAuthSubmit}
                isUser={true}
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
};

export default UserAuth;
