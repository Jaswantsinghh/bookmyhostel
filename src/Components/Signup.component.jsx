import "../Styles/Components/Signup.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [year, setYear] = useState("");
    const [branch, setBranch] = useState("");
    const [crn, setCrn] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState();

    const navigateTo = useNavigate();
    const [userId, setUserId] = useState("");
    const data = {
        name, email, year, branch, crn, password
    };
    const otpData = {
        email, otp
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://book-my-hostel.herokuapp.com/api/auth/register", data)
            .then((data) => {
            console.log(data.data.data.message);
            setUserId(data.data.data._id);
            })
            .catch((err) => {
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

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        axios.post("https://book-my-hostel.herokuapp.com/api/auth/verify-otp", otpData)
            .then((data) => {
            navigateTo('/login')
            })
            .catch((err) => {
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
        userId.length < 1 ? (
            <><div className="Signup">
                <form onSubmit={handleSubmit} className="Signup-form">
                    <h1 className="Signup-form-bmh">Book My Hostel</h1>
                    <h1 className="Signup-form-heading">Sign Up</h1>
                    <label className="Signup-form-label">Name</label>
                    <input placeholder="Enter Name" className="Signup-form-input" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label className="Signup-form-label">Email Address</label>
                    <input placeholder="Enter Email Address" className="Signup-form-input" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label className="Signup-form-label">Year</label>
                    <input placeholder="Enter Year" className="Signup-form-input" value={year} onChange={(e) => setYear(e.target.value)}></input>
                    <label className="Signup-form-label">Branch</label>
                    <input placeholder="Enter Branch" className="Signup-form-input" value={branch} onChange={(e) => setBranch(e.target.value)}></input>
                    <label className="Signup-form-label">Roll number</label>
                    <input placeholder="Enter Roll Number" className="Signup-form-input" value={crn} onChange={(e) => setCrn(e.target.value)}></input>
                    <label className="Signup-form-label">Password</label>
                    <input type="password" placeholder="Enter Password" className="Signup-form-input" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit" className="Signup-form-submit">Submit</button>
                    <p>Already have an account?<a href="/login">Login</a></p>
                </form>
            </div><ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover /></>
        ) : (
            <>
            <div className="Signup">
                    <form onSubmit={handleOtpSubmit} className="Signup-form">
                        <label className="Signup-form-label">Enter OTP</label>
                        <input placeholder="Enter OTP" value={otp} className="Signup-form-input" onChange={(e) => setOtp(e.target.value)}></input>
                        <button type="submit" className="Signup-form-submit">Submit</button>
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
 )
        )
}

export default Signup;