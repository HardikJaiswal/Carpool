import * as React from "react";

class RideMatchFirstForm extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        selectedTimeslot: 0
    };

    timings = [
        { start: 5, end: 9, beforeNoon: true },
        { start: 9, end: 12, beforeNoon: true },
        { start: 12, end: 3, beforeNoon: false },
        { start: 3, end: 6, beforeNoon: false },
        { start: 6, end: 9, beforeNoon: false }
    ];

    setSelectedTimeslot(value) {
        this.setState({ selectedTimeslot: value });
    }

    getValues = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.props.fillDetails(field, value);
    }

    setTimeslot = (event, pos) => {
        event.preventDefault();
        this.props.fillDetails('timeSlot', pos);
        this.setSelectedTimeslot(pos);
    }

    render() {
        return (
            <>
                <div className="inputs">
                    <label>From</label><br />
                    <input type="text" placeholder="Start Point" name="startLocation" onChange={this.getValues.bind(this)} required />
                </div>
                <div className="inputs">
                    <label>To</label><br />
                    <input type="text" placeholder="End Point" name="endLocation" onChange={this.getValues.bind(this)} required />
                </div>
                <div className="inputs">
                    <label>Date</label><br />
                    <input type="date" placeholder="xx/mm/yyyy" name="bookingDate" onChange={this.getValues.bind(this)} required /><br />
                </div>
                <label>Time</label>
                <div className="time-selection">
                    {
                        this.timings.map((item, pos) => {
                            const classArr = ['times'];
                            if (pos == this.state.selectedTimeslot) classArr.push('time-selected');
                            return (
                                <button className={classArr.join(' ')} key={pos} onClick={(e) => this.setTimeslot(e,pos)}>
                                    {item.start}{item.beforeNoon ? 'am' : 'pm'} - {item.end}{item.beforeNoon ? item.end == 12 ? 'pm' : 'am' : item.end == 12 ? 'am' : 'pm'}
                                </button>
                            );
                        })
                    }
                </div><br />
                {
                    this.props.isBooking ?
                        <input type="submit" value="Submit" className="bg-orange" /> :
                        <input type="button" value="Next &#187;" id="next" onClick={(e) => this.props.viewNextForm(e)} />
                }
            </>
        );
    }
}

export default RideMatchFirstForm;