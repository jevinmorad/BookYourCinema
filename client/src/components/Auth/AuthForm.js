import { useState } from "react";
import '../styles/AuthFrom.css';
import swal from 'sweetalert';

export default function AuthForm({ onSubmit, isUser = true }) {
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

            // Close the model
            const modalElement = document.getElementById('exampleModal');
            const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
            bootstrapModal.hide();
            
            // Success message
            swal("Good job!", isSignIn ? "Signed in successfully!" : "Account created successfully!", "success");
        } catch (err) {
            console.error("Form submission failed", err);
            alert("Error occurred during form submission. Please try again.");
        }
    };

    return (
        <>
            {isUser && (
                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"> Sign In </button>
            )}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h3 className="modal-title ps-2" id="exampleModalLabel">{isSignIn ? "Sign In" : "Sign Up"}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}