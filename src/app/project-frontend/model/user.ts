import { Password } from 'primeng/password';
import { Attendance } from './attendance';

import { Employee } from './employee';


export class User {

    id!: string;
    userName!: string;
    active!: Boolean;
   // userEmployee!: Employee;
    userAttendanceAttendances!: Set<Attendance>;
    dateCreated!: Date;
    lastUpdated!: Date;
    conveyanceApplicable!: Boolean;
    passHash!: string;
    isAdmin:Boolean=false;





}
