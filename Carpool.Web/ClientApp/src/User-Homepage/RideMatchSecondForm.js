import FormHeader from "./FormHeader";

function RideMatchSecondForm(){
  return (
    <div>
      <div className='container ride-form-2'>
        <FormHeader isBooking={false} /><br/><br/>
        <form>
          <div className="inputs">
            <label>Stop 1</label><br/>
            <input type="text" placeholder="First Stop" required/>
          </div>
          <div className="inputs">
            <label>Stop 2</label><br/>
            <input type="text" placeholder="Next Stop" required/>
          </div>
          <div className="inputs">
            <label>Stop 3</label><br/>
            <input type="text" placeholder="Next Stop" required/>
          </div>
          <div className="split-in-two">
            <div>
              <label>Availbale Seats</label><br/>
              {[...Array(3+1).keys()].slice(1).map((item,pos)=>{
                let classArr = ['seats'];
                if(pos===0) classArr.push('seat-selected');
                return <button className={classArr.join(' ')} key={pos}>{item}</button>
              })}
            </div>
            <div>
              <label>Price</label><br/>
              {/* <input type="number"/> */}
              <b>180&#36;</b>
            </div>
          </div><br/>
          <input type="submit" value="Submit" className="bg-orange"/>
        </form>
      </div>
    </div>
  );
}

export default RideMatchSecondForm;