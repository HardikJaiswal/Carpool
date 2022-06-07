"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function RideTile(props) {
    var item = props.info;
    var timings = ['5am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'];
    return (React.createElement("div", { className: "container match", onClick: function () { return props.onclick(); } },
        React.createElement("b", null,
            item.FirstName,
            " ",
            item.LastName),
        React.createElement("div", { className: "split-in-two" },
            React.createElement("div", null,
                React.createElement("label", null, "From"),
                React.createElement("br", null),
                item.StartLocation),
            React.createElement("div", null,
                React.createElement("label", null, "To"),
                React.createElement("br", null),
                item.EndLocation),
            React.createElement("div", null,
                React.createElement("label", null, "Date"),
                React.createElement("br", null),
                item.BookingDate),
            React.createElement("div", null,
                React.createElement("label", null, "Time"),
                React.createElement("br", null),
                timings[item.TimeSlot]),
            React.createElement("div", null,
                React.createElement("label", null, "Price"),
                React.createElement("br", null),
                item.Price,
                "$"),
            React.createElement("div", null,
                React.createElement("label", null, props.isHistory ? 'Seats' : 'Seat Availability'),
                React.createElement("br", null),
                item.Seats < 10 ? '0' + item.Seats : item.Seats))));
}
exports.default = RideTile;
//# sourceMappingURL=RideTile.js.map