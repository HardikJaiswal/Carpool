"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Poster() {
    return (React.createElement("div", { className: "poster" },
        React.createElement("img", { src: require('../Assets/logo.png'), style: { margin: '2% 0% 0% 5%', height: '60px' } }),
        React.createElement("br", null),
        React.createElement("div", null,
            React.createElement("em", null,
                "TURN ",
                React.createElement("span", { style: { color: '#ffac19' } }, "MILES")),
            React.createElement("br", null),
            React.createElement("em", null,
                "INTO ",
                React.createElement("span", { style: { color: '#9319ff' } }, "MONEY")),
            React.createElement("br", null),
            "RIDES ON TAP"),
        React.createElement("img", { src: require('../Assets/homebg.png'), alt: "Some image", style: { height: '328px', width: '90%' } })));
}
exports.default = Poster;
//# sourceMappingURL=Poster.js.map