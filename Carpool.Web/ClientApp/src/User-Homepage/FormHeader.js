function FormHeader(props){
  return (
    <div>
      <span className="form-heading">{props.isBooking ? 'Book' : 'Offer'} a ride</span>
      <label className="switch">
        <input type="checkbox" onclick={props.toggleService}/>
        <span className="slider round"></span>
      </label><br/>
      <label>We get your matches asap!</label>
    </div>
  );
}

export default FormHeader;