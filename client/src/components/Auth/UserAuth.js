import { userAuthRequest } from '../../api-helpers/api-helper';
import AuthForm from './AuthForm';

const Auth = () => {
    const handleAuthSubmit = (inputData, isSignIn) => {
        console.log("Form data submitted:", inputData, "isSignIn: ",isSignIn);
        userAuthRequest(inputData, isSignIn)
        .catch((err)=>console.error(err))
    };

    return (
        <div>
            <AuthForm onSubmit={handleAuthSubmit} />
        </div>
    );
};

export default Auth;
