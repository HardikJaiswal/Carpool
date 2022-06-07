import * as React from "react";
import { useNavigate } from "react-router-dom";

function FormHeader(props) {

    let navigate = useNavigate();
    return (
        <div>
            <span className="form-heading">{props.isBooking ? 'Book' : 'Offer'} a ride</span>
            <label className="switch">
                {props.isBooking ?
                    <input type="checkbox" checked onChange={() => navigate('/offerride')} /> :
                    <input type="checkbox" onChange={() => navigate('/bookride')} />}
                <span className="slider round"></span>
            </label><br />
            <label>We get your matches asap!</label>
        </div>
    );
}

export default FormHeader;