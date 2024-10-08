import { useState } from "react";
import '../styles/AuthFrom.css';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AuthForm({ onSubmit, isUser, showModal, handleClose}) {

    const [isSignIn, setIsSignIn] = useState(true);

    const [input, setInput] = useState({
        name: "",
        mobile: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(input, isSignIn);

            // close the modal
            handleClose();

            // Success message
            swal("Good job!", isSignIn ? "Signed in successfully!" : "Account created successfully!", "success");
        } catch (err) {
            console.error("Form submission failed", err);
            alert("Error occurred during form submission. Please try again.");
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title >{isSignIn ? "Sign In" : "Sign Up"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit}>
                                <div className="form-container">
                                    {!isSignIn && (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label">Username</label>
                                                <input
                                                    type="text"
                                                    className="form-underline"
                                                    id="username"
                                                    name="name"
                                                    placeholder="Enter your username"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Mobile number</label>
                                                <input
                                                    type="text"
                                                    className="form-underline"
                                                    id="mobile"
                                                    name="mobile"
                                                    placeholder="+91"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-underline"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-underline"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="submit-btn-container">
                                    <button type="submit" className="btn-submit">
                                        {isSignIn ? "Sign In" : "Sign Up"}
                                    </button>
                                </div>
                            </form>

                            <div className="sign-in mt-3">
                                {isSignIn ? "Create new account" : "Already have an account?"}&nbsp;
                                <button
                                    className="text-primary"
                                    onClick={() => setIsSignIn(!isSignIn)}
                                    style={{ textDecoration: 'underline' }}
                                >
                                    {isSignIn ? "Sign Up" : "Sign In"}
                                </button>
                            </div>
                </Modal.Body>
            </Modal >
        </>
    );
}