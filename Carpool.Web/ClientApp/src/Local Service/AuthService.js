"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = exports.setName = exports.setId = exports.getId = void 0;
localStorage.setItem("userId", "0");
localStorage.setItem("fName", "");
localStorage.setItem("lName", "");
function getId() {
    return parseInt(localStorage.getItem("userId"));
}
exports.getId = getId;
function setId(Id) {
    localStorage.setItem("userId", Id.toString());
}
exports.setId = setId;
function setName(firstName, lastName) {
    localStorage.setItem("fName", firstName);
    localStorage.setItem("lName", lastName);
}
exports.setName = setName;
function getName() {
    var firstName = localStorage.getItem("fName");
    var lastName = localStorage.getItem("lName");
    return [firstName, lastName];
}
exports.getName = getName;
//# sourceMappingURL=AuthService.js.map