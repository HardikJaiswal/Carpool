import HttpService from "./Common/HttpService.ts";

export class UserService {
    httpService: HttpService;

    constructor() {
        this.httpService = new HttpService();
    }

    getUserProfile(id: number) {
        return this.httpService.getData(`/api/userservice/getprofile?id=${id}`);
    }

    loginUser(email: string, password: string) {
        return this.httpService.getData(`/api/userservice/getuser?email=${email}&password=${password}`);
    }

    createUser(email: string, password: string) {
        return this.httpService.postData(`/api/userservice/create?email=${email}&password=${password}`);
    }

    getBookedRide(id: number) {
        return this.httpService.getData(`/api/userservice/getBookedRides?id=${id}`);
    }

    getOfferedRide(id: number) {
        return this.httpService.getData(`/api/userservice/getOfferedRides?id=${id}`);
    }

    updateName(fName: string, lName: string, id: number) {
        return this.httpService.patchData(`/api/userservice/updateNames?firstName=${fName}&lastName=${lName}&id=${id}`);
    }
}