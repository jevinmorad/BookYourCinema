import { useState } from "react";
require('../styles/AuthFrom.css')

export default function LoginForm() {
    const [isSignIn, setIsSignIn] = useState(false);
    const [input, setInput] = useState({
        name: "",
        mobile: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setInput((prevInput)=> ({
            ...prevInput,
            [e.target.name] : e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign in</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h3 className="modal-title ps-2" id="exampleModalLabel">{isSignIn ? "Sign in" : "Sign Up"}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-container">
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" className=" form-underline" id="username" name="name" placeholder="Enter your username" onChange={handleChange}/>
                                </div>

                                {!isSignIn &&
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Mobile number</label>
                                            <input type="text" className="form-underline" id="mobile" name="mobile" placeholder="+91 " onChange={handleChange}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-underline" id="email" name="email" placeholder="Enter your email" onChange={handleChange}/>
                                        </div>
                                    </>
                                }

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-underline" id="password" name="password" placeholder="Enter your password" onChange={handleChange}/>
                                </div>
                            </div>

                            <div className="submit-btn-container">
                                <button type="submit" className="btn-submit" onClick={handleSubmit}>{isSignIn ? "Sign In" : "Sign Up"}</button>
                            </div>

                            <div className="sign-in">
                                {isSignIn ? "Create new account" : "Already have account?"}&nbsp;<span><button href='' onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "Sign Up" : "Sign In"}</button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
