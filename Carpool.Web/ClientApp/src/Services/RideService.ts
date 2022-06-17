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
            Source: ride.startLocation,
            Destination: ride.endLocation,
            AvailableSeats: ride.seats,
            SeatPrice: ride.price
        };
        let data = {
            RideObject: rideDetails,
            TimeSlot: ride.timeSlot,
            Date: ride.bookingDate
        };
        return this.httpService.postData(`/api/rideservice/offerride`,data);
    }

}