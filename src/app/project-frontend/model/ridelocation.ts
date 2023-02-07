import { Ride } from "./ride";

export class RideLocation {
    id!: number;
    lattitude!: number;
    longitude!: number;
    ridenavigationpoint!: Ride;
    dateCreated!: Date;
    lastUpdated!: Date;
}