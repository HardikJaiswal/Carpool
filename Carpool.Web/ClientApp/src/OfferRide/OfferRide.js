"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FormHeader_1 = require("../Common/FormHeader");
var RideMatchFirstForm_1 = require("../Common/RideMatchFirstForm");
var RideMatchSecondForm_1 = require("../Common/RideMatchSecondForm");
function OfferRide() {
    var firstFormParameters = {
        source: '',
        destination: '',
        date: '',
        timeslot: -1
    };
    var setFirstFormValues = function (field, value) {
        firstFormParameters[field] = value;
    };
    return (React.createElement("div", { className: "ride-form" },
        React.createElement("div", { className: "container form" },
            React.createElement(FormHeader_1.default, { isBooking: false }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("form", null,
                React.createElement(RideMatchFirstForm_1.default, { isBooking: false, fillDetails: function (field, value) { return setFirstFormValues(field, value); } }))),
        React.createElement(RideMatchSecondForm_1.default, null)));
}
exports.default = OfferRide;
//# sourceMappingURL=OfferRide.js.map