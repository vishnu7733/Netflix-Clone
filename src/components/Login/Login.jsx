import { createPortal } from "react-dom";
import { auth } from "../../Firebase/firebase.js";
import "./Login.css";
import { useContext, useState } from "react";
import { authModalContext } from "../../AuthModal.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
export default function Login() {
    const { openRegister, closeLogin } = useContext(authModalContext);
    const [credentials, setCredentials ] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCredentials(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credential=await signInWithEmailAndPassword(auth, credentials.Email, credentials.Password);
            const user = credential.user;
            if (user) {
                toast.success("Logged In Successfully");
                console.log(user);
                setErrorMessage(null);
                closeLogin();
            }
        } catch (err) {
            if (err.code === "auth/invalid-credential") {
                setErrorMessage("Invalid email or password");
            } else if (err.code === "auth/user-disabled") {
                setErrorMessage("This account has been disabled");
            } else if (err.code === "auth/too-many-requests") {
                setErrorMessage("Too many attempts. Try again later");
            } else {
                setErrorMessage(err.message);
            }
        }

    }
    return createPortal(<>
        <div className="auth-overlay" onClick={closeLogin} >
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close" onClick={closeLogin}>×</button>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} >
                    <input type="email" placeholder="Email" name="Email" onChange={handleInput} />
                    <input type="password" placeholder="Password" name="Password" onChange={handleInput} />
                    <button type="submit">Login</button>
                    {errorMessage && <span className="text-danger">{errorMessage}</span>}

                </form>
                <p>
                    New here?
                    <button type="button" onClick={() => { closeLogin(); openRegister() }}>
                        Register
                    </button>
                </p>
            </div>
        </div>
    </>, document.body);
}