import { Time } from "@angular/common";
import { Employee } from "./employee";


export class Attendance {

    id!: any;
    staffName!:string;
    startTime!:Time;
    endTime!:Time;
    clockIn!:string;
    clockOut!:string;
    clockInLatitude!:number;
    clockInLongitude!:number;
    clockOutLatitude!:number;
    clockOutLongitude!:number;
    date!:Date;
    employeeCode!:string;
    onLeave!:Boolean;
    reasonForLeave!:string;
    type!:string;
    clockInLocation!:string;
    clockOutLocation!:string;
    branch!:string

}
