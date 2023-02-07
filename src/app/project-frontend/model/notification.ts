import { Employee } from "./employee";

export class Notification {
    id!: String;
    message!: string;
    type!: string;
    read!: Boolean;
    employeeNotification!: Employee;
}
