import { useState } from "react";
import FormHeader from "../Common/FormHeader";

export default function RideMatchSecondForm() {
    let [seatPos, setSeatPos] = useState(0);
    let stopsCount = 1;
    let stops = [];

    const addNewStopInput = () => {
        if (stopsCount < 5) {
            let item = (<div className="inputs">
                <label>Stop {stopsCount}</label><br />
                <input type="text" placeholder="Next Stop" required />
            </div>);
            stops.push(item);
        }
    }

    return (
        <div>
            <div className='container ride-form-2'>
            <FormHeader isBooking={false} /><br/><br/>
            <form>
                <div className="inputs">
                    <label>Stop 1</label><br/>
                    <input type="text" placeholder="First Stop" required />
                </div>
                {stops.map((item) => {
                    return item;
                })}
                <svg className="add-stop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={addNewStopInput}>
                    <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                </svg>
                <div className="split-in-two">
                <div>
                    <label>Availbale Seats</label><br/>
                    {[...Array(3+1).keys()].slice(1).map((item,pos)=>{
                        let classArr = ['seats'];
                        if (pos === seatPos) classArr.push('seat-selected');
                        return (
                            <button className={classArr.join(' ')} key={pos} onClick={() => setSeatPos(pos)}>
                            {item}
                        </button>);
                    })}
                </div>
                <div className="ride-cost">
                    <label>Price</label><br/>
                    {/*<input type="number"/> */}
                    <span>180&#36;</span>
                </div>
                </div><br/><br/><br/>
                <input type="submit" value="Submit" className="bg-orange"/>
            </form>
            </div>
        </div>
    );
}