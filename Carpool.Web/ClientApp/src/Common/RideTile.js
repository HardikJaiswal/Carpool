"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function RideTile(props) {
    var item = props.info;
    var timings = ['5am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'];
    var getTime = function (hour) {
        if (hour < 9)
            return timings[0];
        else if (hour < 12)
            return timings[1];
        else if (hour < 15)
            return timings[2];
        else if (hour < 18)
            return timings[3];
        else
            return timings[4];
    };
    return (React.createElement("div", { className: "container match", onClick: function () { return props.onclick(); } },
        React.createElement("div", { className: "tile-header" },
            React.createElement("b", null, item.OfferedBy),
            React.createElement("img", { src: require("../Assets/profile-photo.jpg") })),
        React.createElement("div", { className: "split-in-two" },
            React.createElement("div", null,
                React.createElement("label", null, "From"),
                React.createElement("br", null),
                item.Source),
            React.createElement("div", null,
                React.createElement("label", null, "To"),
                React.createElement("br", null),
                item.Destination),
            React.createElement("div", null,
                React.createElement("label", null, "Date"),
                React.createElement("br", null),
                item.BookingDate.substring(0, 10)),
            React.createElement("div", null,
                React.createElement("label", null, "Time"),
                React.createElement("br", null),
                getTime(parseInt(item.BookingDate.substring(11, 13)))),
            React.createElement("div", null,
                React.createElement("label", null, "Price"),
                React.createElement("br", null),
                item.Price,
                "$"),
            React.createElement("div", null,
                React.createElement("label", null, props.isHistory ? 'Seats' : 'Seat Availability'),
                React.createElement("br", null),
                item.AvailableSeats < 10 ? '0' + item.AvailableSeats : item.AvailableSeats))));
}
exports.default = RideTile;
//# sourceMappingURL=RideTile.js.map