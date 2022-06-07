import HttpService from "./Common/HttpService.ts";

export class RideService {
    httpService: HttpService;

    constructor() {
        this.httpService = new HttpService();
    }

    bookRide(rideId: number, userId: number) {
        return this.httpService.patchData(`/api/rideservice/bookride?bookerId=${userId}&rideId=${rideId}`);
    }

    findMatchingRides(ride: object) {
        let queryString = "";
        let keyNames = Object.keys(ride);
        for (let i = 0; i < keyNames.length; i++) {
            if (i === keyNames.length - 1) queryString += `${keyNames[i]}=${ride[keyNames[i]]}`;
            else queryString += `${keyNames[i]}=${ride[keyNames[i]]}&`;
        }
        return this.httpService.getData(`/api/rideservice/findride?${queryString}`);
    }

    offerRide(ride: object) {
        let rideDetails = {
            OwnerId: ride.userId,
            StartLocation: ride.startLocation,
            EndLocation: ride.endLocation,
            BookingDate: ride.bookingDate,
            TimeSlot: ride.timeSlot,
            Seats: ride.seats,
            Price: ride.price
        };
        let queryString = "";
        let keyNames = Object.keys(rideDetails);
        console.log(rideDetails);
        for (let i = 0; i < keyNames.length; i++) {
            if (i === keyNames.length - 1) queryString += `${keyNames[i]}=${rideDetails[keyNames[i]]}`;
            else queryString += `${keyNames[i]}=${rideDetails[keyNames[i]]}&`;
        }
        console.log(queryString);
        return this.httpService.postData(`/api/rideservice/offerride?${queryString}`);
    }

}