import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../Styles/Homepage.css';
import Footer from './Footer.component';
import Navbar from './Navbar.component';
import {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

Modal.setAppElement('#root');

function Homepage() {
    const [footer, setFooter] = useState(false);
    const [room, setRoom] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [roomNo, setRoomNo] = useState("");
    const [isBooked, setBook] = useState(false);
    const [disabled, setDisabled] = useState([]);
    const [firstTime, setFirstTime] = useState(false);

    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState(location.pathname === "/single" ? "1" : "3");
    const navigateTo = useNavigate();
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '24px',
        },
    };

    const onRoomClick = (e, key) => {
        if(!disabled.includes(key))
        {
            setRoom(key);
            if(key === room) {
                setFooter(!footer);
                console.log(footer);
            }
            else {
                setFooter(true);
            }
            console.log("worked")
        }
    }

    const handleRoomBook = (e) => {
        e.preventDefault;
        setModalOpen(false);
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            room: room,
            id: user._id
        }
        axios.post("https://book-my-hostel.herokuapp.com/api/book/", data, {headers: {
            'Authorization': 'Bearer ' + user.token
          }})
        .then(() => {
            toast.success("Room booked successfully!!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setBook(true);
            localStorage.setItem("room", JSON.stringify(room));
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
    let tripleList = [];

    for( let i = 1; i < 41; i++) {
        tripleList.push(
            <div key={`r-${i}`} onClick={(event) => onRoomClick(event, i)} className={disabled.includes(i) ? "cell disabled" : footer && room===i ? "cell active" : "cell"}>{`R${i}`}</div>
        );
        if(i%10===0 && i<40) {
            tripleList.push(
                <div key={`c-${i}`} className="corridor"><p>Corridor</p></div>
            )
        }
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user?.token) {
           navigateTo('/login')
        }
    }, [])
    
    useEffect(() => {
        if (!firstTime)
        {
            const user = JSON.parse(localStorage.getItem('user'));
        axios.get("https://book-my-hostel.herokuapp.com/api/book/", {headers: {
            'Authorization': 'Bearer ' + user.token
          }})
          .then((data) => {
            setFirstTime(true);
            console.log(data.data.data);
            data.data.data.map(({room})=>{
                setDisabled(prevState => [...prevState, room])
            })
            data.data.data.map(({user_id, room})=>{
                if(user_id === user._id)
                {
                    if (roomNo.length < 1) {
                    localStorage.setItem("room", JSON.stringify(room));
                    setRoomNo(room);
                    setBook(true)
                    }
                }
            })
        })
        .catch((err) => {
            console.log(err.message);
            if(err.message == "Request failed with status code 401") {
                localStorage.removeItem("user");
                navigateTo("/login");
            }
        })
    }
    }, [])

    const singleList = [];
    for( let i = 1; i < 41; i++) {
        singleList.push(
            <div key={`r-${i}`} onClick={(event) => onRoomClick(event, i)} className={disabled.includes(`${i}`) ? "cell disabled" : footer && room===i ? "cell active" : "cell"}>{`R${i}`}</div>
        );
        if(i%10===0 && i<40) {
            singleList.push(
                <div key={`c-${i}`} className="corridor"><p>Corridor</p></div>
            )
        }
    }
return(
    <>
    <Navbar />
    {currentLocation === "1" ? (
        <div className="home-container">
        <h1 className="singleHeading">Single Bed Rooms, Hostel 1</h1>
        <div className="cell-grid">
            {singleList}
        </div>
    </div>
    ) : (
        <div className="home-container">
        <h1 className="singleHeading">Triple Bed Rooms, Hostel 1</h1>
        <div className="cell-grid">
            {tripleList}
        </div>
    </div>
    )}
    {footer && <Footer isBooked={isBooked} room={roomNo} setModalOpen={setModalOpen} />}
    {<Modal
    isOpen={isModalOpen}
    style={customStyles}
    >
        <div className="modalContainer">
            <h1>Are your sure you want to book this room?</h1>
            <p className="modalData">Room: {`${room}`}</p>
            <p className="modalData">Room type: Single</p>
            <p className="modalData">Hostel no.: 1</p>
            <div className="buttonContainer">
            <button className="button1" onClick={handleRoomBook}>Yes</button>
            <button className="button2" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
        </div>
    </Modal>}
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

export default Homepage;