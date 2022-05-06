function UserServiceOptions(props){
  return (
    <main className="service-menu">
      <h1><b>Hey {props.userData.firstName}!</b></h1>&nbsp;<br />
      <div className="service-btn bg-purple" onClick={props.showBooking} style={{cursor: "pointer"}}>Book a ride</div>
      <div className="service-btn bg-orange" onClick={props.showOffering} style={{cursor: "pointer"}}>Offer a ride</div>
    </main>
  );
}

export default UserServiceOptions;