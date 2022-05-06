import FormHeader from "./FormHeader";
import RideMatchResult from "./RideMatches";
import RideMatchFirstForm from "./RideMatchFirstForm";
import RideMatchSecondForm from "./RideMatchSecondForm";

function Services(props){
  return (
    <div className="ride-form">
      <div className="container form">
        <FormHeader isBooking={props.isBooking} toggleService={props.toggleService} /><br/><br/>
        <form>
          <RideMatchFirstForm isBooking={props.isBooking}/>
        </form>
      </div>
      {props.isBooking ? <RideMatchResult /> : <RideMatchSecondForm />}
    </div>
  );
}

export default Services;