import * as React from "react";

export default function Poster() {
    return (
        <div className="poster">
            <img src={require('../Assets/logo.png')} style={{ margin: '2% 0% 0% 5%', height: '60px' }} /><br />
            <div>
                <em>TURN <span style={{ color: '#ffac19' }}>MILES</span></em><br />
                <em>INTO <span style={{ color: '#9319ff' }}>MONEY</span></em><br />
                RIDES ON TAP
            </div>
            <img src={require('../Assets/homebg.png')} alt="Some image" style={{ height: '328px', width: '90%' }} />
        </div>
    );
}
