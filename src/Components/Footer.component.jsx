import "../Styles/Components/Footer.css"
function Footer(props) {
    return(
        <div className="footer">
            {props.isBooked ? (
                <div className="alreadyButton">{`Already booked room ${props.room}`}</div>
            ) : (
                <div className="button" onClick={() => props.setModalOpen(true)}>Book</div>
            ) }
        </div>
    )
}

export default Footer;