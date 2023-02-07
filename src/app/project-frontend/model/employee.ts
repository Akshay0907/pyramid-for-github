
import { Address } from "./address";
import { Branch } from "./branch";
import { User } from "./user";
import { Vehicle } from "./vehicle";


export class Employee {

    id!: string;
    empNo!: string;
    firstName!: string;
    middleName!: string;
    lastName!: string;
    emailId!: string;
    primaryContactNo!: string;
    secondaryContactNo!: string;
    branchEmployee!: Branch;
    userEmployee!: User;
    role!:string;
    //dateCreated!: Date;
    //lastUpdated!: Date;
    fatherName!: string;
    dob!: Date;
    uid!: string;
    active!: Boolean;
    deleted!: Boolean;
    employeeAddress!: Address;
    employeeVehicle!: Vehicle;
    isDistrictSame!:Boolean;
    block!:Boolean;









}
