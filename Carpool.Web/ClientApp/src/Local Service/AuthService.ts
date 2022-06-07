localStorage.setItem("userId", "0");
localStorage.setItem("fName", "");
localStorage.setItem("lName", "");

export function getId() {
    return parseInt(localStorage.getItem("userId"));
}

export function setId(Id: number) {
    localStorage.setItem("userId", Id.toString());
}

export function setName(firstName: string, lastName: string) {
    localStorage.setItem("fName", firstName);
    localStorage.setItem("lName", lastName);
}

export function getName() {
    let firstName = localStorage.getItem("fName");
    let lastName = localStorage.getItem("lName");
    return [firstName, lastName];
}