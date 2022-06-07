"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./Dashboard.css");
function Dashboard() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var navigateTo = function (path) {
        navigate(path);
    };
    var user = {
        firstName: "there"
    };
    return (React.createElement("div", { className: "dashboard-body" },
        React.createElement("main", { className: "service-menu" },
            React.createElement("h1", null,
                React.createElement("b", null,
                    "Hey ",
                    user.firstName,
                    "!")),
            "\u00A0",
            React.createElement("br", null),
            React.createElement("div", { className: "service-btn bg-purple", onClick: function () { return navigateTo('/bookride'); } }, "Book a ride"),
            React.createElement("div", { className: "service-btn bg-orange", onClick: function () { return navigateTo('/offerride'); } }, "Offer a ride"))));
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map