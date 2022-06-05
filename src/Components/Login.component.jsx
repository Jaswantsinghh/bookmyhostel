import "../Styles/Components/Signup.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigateTo = useNavigate();
    const data = {
        email, password
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://book-my-hostel.herokuapp.com/api/auth/login", data)
            .then((response) => {
            if (response.data.data.token){
                localStorage.setItem("user", JSON.stringify(response.data.data));
                navigateTo("/single");
            }
            })
            .catch((err) => {
                console.log(err);
                    toast.error(err.response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            })
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user?.token) {
           navigateTo('/single')
        }
        console.log("worked")
    }, [])
    return(
        <>
        <div className="Signup">
            <form className="Signup-form" onSubmit={handleSubmit}>
                <h1 className="Signup-form-bmh">Book My Hostel</h1>
                <h1 className="Signup-form-heading">Login</h1>
                <label className="Signup-form-label">Email Address</label>
                <input placeholder="Enter Email Address" className="Signup-form-input" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label className="Signup-form-label">Password</label>
                <input type="password" placeholder="Enter Password" className="Signup-form-input" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button className="Signup-form-submit">Submit</button>
                <p>Do not have an account?<a href="/signup">Signup</a></p>
            </form>
        </div>
        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </>
    );
}

export default Login;