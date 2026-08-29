import { createPortal } from "react-dom";
import "./Register.css";
import { useContext, useState } from "react";
import { authModalContext } from "../../AuthModal.jsx";
import { auth, db } from "../../Firebase/firebase.js"
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
export default function Register() {
    const { closeRegister, openLogin } = useContext(authModalContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState({});
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(user => ({ ...user, [name]: value }));
    }
    const validateEmail = (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = document.querySelector(".email");

        if (pattern.test(value)) {
            email.classList.add("d-none");
            email.classList.remove("d-block");
        } else {
            email.classList.add("d-block");
            email.classList.remove("d-none");
        }
    };

    const validatePassword = (value) => {
        const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{8,}$/;
        const password = document.querySelector(".password");
        if (pattern.test(value)) {
            password.classList.remove("d-block");
            password.classList.add("d-none");
        } else {
            password.classList.add("d-block");
            password.classList.remove("d-none");
        }
    }
    const validateConfirmPassword = (value) => {

        const password = document.querySelector(".Confirmpassword");
        if (value === user.Password) {
            password.classList.remove("d-block");
            password.classList.add("d-none");
        } else {
            password.classList.add("d-block");
            password.classList.remove("d-none");
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, user.Email, user.Password);
            const User = auth.currentUser;
            console.log(User);
            if (User) {
                await setDoc(doc(db, "users", User.uid), {
                    name: user.Name,
                    email: User.email
                });
                closeRegister();
                toast.success("Registered successfully");
                setErrorMessage(null);
            }
        }
        catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setErrorMessage("Email is already registered");
            } else if (err.code === "auth/invalid-email") {
                setErrorMessage("Invalid email");
            } else if (err.code === "auth/weak-password") {
                setErrorMessage("Password is too weak");
            } else {
                setErrorMessage(err.message);
            }
        }
    }
    return createPortal(<>

        <div className="auth-overlay" onClick={closeRegister} >
            <div className="register-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close" onClick={closeRegister}>×</button>

                <h2>Register</h2>
                <h2>Netflix Clone</h2>
                <p className="demo-notice">Demo project — not affiliated with Netflix</p>
                <h3>Create Account</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="Name" value={user.Name} onChange={handleInput} placeholder="Name" />

                    <input type="email" name="Email" id="email" value={user.Email} onChange={(e) => { handleInput(e); validateEmail(e.target.value); }} placeholder="Email" />
                    <span className="text-danger email d-none ">Invalid Email</span>

                    <input type="password" name="Password" id="password" value={user.Password} onChange={(e) => { handleInput(e); validatePassword(e.target.value); }} placeholder="Password" />
                    <span className="text-danger password d-none ">Password should contain atleast one upper case
                        lower case
                        digit and a
                        special character </span>
                    <input type="password" name="ConfrimPassword" value={user.ConfrimPassword} onChange={(e) => { handleInput(e); validateConfirmPassword(e.target.value); }} placeholder="Confirm Password" />
                    <span className="text-danger Confirmpassword d-none ">Password and Confirm password doesn't match</span>
                    <button type="submit">Register</button>
                    {errorMessage && <span className="text-danger">{errorMessage}</span>}

                </form>

                <p>
                    Already have an account?
                    <button type="button" onClick={() => { closeRegister(); openLogin() }}>
                        Login
                    </button>
                </p>
            </div>
        </div>

    </>, document.body);
}