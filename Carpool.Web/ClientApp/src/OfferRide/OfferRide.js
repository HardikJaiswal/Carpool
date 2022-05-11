import FormHeader from "../Common/FormHeader";
import RideMatchFirstForm from "../Common/RideMatchFirstForm";
import RideMatchSecondForm from "../Common/RideMatchSecondForm";

function OfferRide() {
    let firstFormParameters = {
        source: '',
        destination: '',
        date: '',
        timeslot: -1
    };

    const setFirstFormValues = (field, value) => {
        formParameters[field] = value;
    }
    return (
        <div className="ride-form">
            <div className="container form">
                <FormHeader isBooking={false} /><br /><br />
                <form>
                    <RideMatchFirstForm isBooking={false} fillDetails={(field, value) => setFirstFormValues(field, value)} />
                </form>
            </div>
            <RideMatchSecondForm />
        </div>
    );
}

export default OfferRide;