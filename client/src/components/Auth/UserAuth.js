import { useState } from 'react';
import { userAuthRequest } from '../../api-helpers/api-helper';
import AuthForm from './AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../Store';

const UserAuth = () => {
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();
    const onResReceived = (data) => {
        console.log(data);
        
        dispatch(userActions.login());
        localStorage.setItem('userId', data._id);
    }

    const [showModal, setShowModal] = useState(false);

    const handleAuthSubmit = (inputData, isSignIn) => {
        userAuthRequest(inputData, isSignIn)
            .then(onResReceived)
            .catch((err) => console.error(err))
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleLogout = () => dispatch(userActions.logout());

    return (
        <>
            {isUserLoggedIn ?
                (<button onClick={handleLogout} className="btn btn-danger">Log out</button>):
                (<button onClick={handleShow} className="btn btn-danger">Sign in</button>)
            }

            <AuthForm
                onSubmit={handleAuthSubmit}
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
};

export default UserAuth;
