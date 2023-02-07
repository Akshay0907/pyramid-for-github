import { Employee } from "./employee";
import { RideLocation } from "./ridelocation";
import { Time } from "@angular/common";

export class Ride {

    branchName!: string;

    employeeCode!: string

    id!: string;

    inLatitude!: number

    inLongitude!: number

    outLatitude!: number

    outLongitude!: number

    reason!: string;

    reimbursementCost!: number

    rideDate!: Date

    rideDistance!: number

    rideEndTime!: Time;

    rideStartTime!: TimeRanges;

    sanctionDistance!: number;

    staffName!: string;

    vehicleNumber!: string;

    snapShot!: string;

    startLocation!: string;

    endLocation!: string;

}
