import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { MessageService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CompOff } from 'src/app/project-frontend/model/compOff';
import { AttendenceService } from 'src/app/project-frontend/services/attendence.service';
import { ConveyanceService } from 'src/app/project-frontend/services/conveyance.service';
import { EmployeeService } from 'src/app/project-frontend/services/employee.service';
import { NotificationService } from 'src/app/project-frontend/services/notification.service';

@Component({
  selector: 'app-rejected-comp-off',
  templateUrl: './rejected-comp-off.component.html',
  styleUrls: ['./rejected-comp-off.component.scss']
})
export class RejectedCompOffComponent implements OnInit {
    totalRecord!:any
    compOffList!:CompOff[]
  constructor(private messagrService : MessageService,

    private employeeService : EmployeeService,private conveyanceService:ConveyanceService,private router: Router,private attendanceService:AttendenceService, private notificationService: NotificationService) { }

   
    ngOnInit(): void {
this.getCompOffList()







}








    items!: MenuItem[];

    products!: any[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;





    acceptCompOff(id:any){
        this.employeeService.acceptCompOff(id).subscribe(list=>this.getCompOffList())
    }

    rejectCompOff(id:any){
        this.employeeService.deleteCompOff(id).subscribe(list=>this.getCompOffList())
    }

    getCompOffList(){
        this.employeeService.getAllRejectedCompOff().subscribe(employee=>this.compOffList=employee)
    }

    downloadCurrentMonthBirthdayCsv() {
        this.employeeService
            .getCurrentMonthBirthEmployeeCSV()
            .subscribe(data => {
                const blob1 = new Blob([data], { type: 'text/csv' });
                FileSaver.saveAs(blob1, 'BirthDay Employees.csv');
            });
    }
}
