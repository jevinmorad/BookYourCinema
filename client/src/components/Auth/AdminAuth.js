import { useEffect } from "react";
import { adminAuthRequest } from "../../api-helpers/api-helper";
import AuthForm from "./AuthForm";

const AdminAuth = () => {
    const handleAuthSubmit = async (inputData, isSignIn) => {
        try {
            await adminAuthRequest(inputData, isSignIn);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let bootstrapModal;
        try {
            const modalElement = document.getElementById('exampleModal');
            bootstrapModal = new window.bootstrap.Modal(modalElement);
            bootstrapModal.show(); // Show the modal on component mount
        } catch (err) {
            console.error(err);
        }

        return () => {
            if (bootstrapModal) {
                bootstrapModal.hide(); // Hide on unmount
                bootstrapModal.dispose(); // Dispose of the modal
            }
        };
    }, []); // Trigger modal once when component mounts

    return (
        <div>
            <AuthForm onSubmit={handleAuthSubmit} isUser={ false }/>
        </div>
    );
};

export default AdminAuth;