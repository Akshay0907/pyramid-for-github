import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { MenuItem, MessageService } from 'primeng/api';
// import { Product } from '../../api/product';
// import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { CompOff } from '../../model/compOff';
import { EmployeeBirthday } from '../../model/employeeBirthday';
import { AttendenceService } from '../../services/attendence.service';
import { ConveyanceService } from '../../services/conveyance.service';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../services/notification.service';


@Component({
    templateUrl: './dashboard.component.html',
    styles: [`
.green-card {
    transition: all 0.3s ease-in-out;
    transform: scale(1);
}

.green-card:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
}




    `]
})
export class DashboardComponent implements OnInit, OnDestroy {
    data: any
    datapie:any
    lineRideData:any
    lineDistanceData:any
totalEmployeeCount:any
totalAppUser:any
yesterdayReimbursement:any
activeRides:any
    sixMonthReimbursement!: any[];
    sixDaysRides!:any[];
months:string[]=[]
days:string[]=[]
sixMonthsData:number[]=[]
sixDaysRideData:number[]=[]
sixDaysDistanceData:number[]=[]
yesterdayAttendanceCount:number[]=[]
yesterdayAttendanceCountData!:any[]
    UnreadNotifications: any;
    totalRecords: any;
    CurrentPetrol:any
    birthEmployee!:EmployeeBirthday[]
    totalRecord!:any
    compOffList!:CompOff[]
  constructor(private messagrService : MessageService,

    private employeeService : EmployeeService,private conveyanceService:ConveyanceService,private router: Router,private attendanceService:AttendenceService, private notificationService: NotificationService) { }

    ngOnDestroy(): void {

    }
    ngOnInit(): void {
this.getCompOffList()
        this.employeeService.getCurrentMonthBirthEmployee().subscribe(employee=>{this.birthEmployee=employee
        this.totalRecord=employee.length})
        this.conveyanceService.getCurrentPetrolPrice().subscribe(price=>{this.CurrentPetrol=price
        console.log(this.CurrentPetrol)})
        this.fetchUnreadNotifications()
        this.employeeService.getEmployeeCount().subscribe(data=>this.totalEmployeeCount=data);
        this.employeeService.getAppUserCount().subscribe(data=>this.totalAppUser=data);
        this.conveyanceService.getYesterdayReimbursement().subscribe(data=>this.yesterdayReimbursement=data);
        this.conveyanceService.getActiveRides().subscribe(data=>this.activeRides=data);
        this.conveyanceService.getSixMonthReimbursement().subscribe(data=>{this.sixMonthReimbursement=data
            console.log(this.sixMonthReimbursement.forEach(reim=>{var tArr = reim.split(",");this.months.push(tArr[0]) ;this.sixMonthsData.push( parseInt(tArr[1]));}))

console.log(this.months)
console.log(this.sixMonthsData)
this.data = {
    labels: this.months,
    datasets: [
        {
            label: 'Reimbursement Amount',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: this.sixMonthsData
        },

    ]
}

        })

        this.conveyanceService.getSixDaysRides().subscribe(data=>{this.sixDaysRides=data
            console.log(this.sixDaysRides.forEach(reim=>{var tArr = reim.split(",");this.days.push(tArr[0]) ;this.sixDaysRideData.push( parseInt(tArr[1]));this.sixDaysDistanceData.push(parseInt(tArr[2]))}))

console.log(this.days)
console.log(this.sixDaysRideData)
this.lineRideData = {
    labels: this.days,
    datasets: [
        {
            label: 'NO. of Rides',
                    data: this.sixDaysRideData,
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4

        },


    ]
}

this.lineDistanceData= {
    labels: this.days,
    datasets: [

        {
            label: 'Distance Travelled',
            data: this.sixDaysDistanceData,
            fill: false,
            borderColor: '#FFA726',
            tension: .4
        }

    ]
}
        })

this.attendanceService.getPresentAbsentCount().subscribe(data=>{this.yesterdayAttendanceCountData=data
    this.yesterdayAttendanceCountData.forEach(att=>{var tArr = att.split(",");this.yesterdayAttendanceCount.push(parseInt(tArr[0])) ;this.yesterdayAttendanceCount.push( parseInt(tArr[1]));})


    this.datapie = {
        labels: ['Present','On Leave'],
        datasets: [
            {
                data: this.yesterdayAttendanceCount,
                backgroundColor: [
                    "#66BB6A",
                    "#f54242"
                                    ],
                hoverBackgroundColor: [
                    "#74c177",
                    "#f65555",

                ]
            }
        ]
    };

})

    }

    items!: MenuItem[];

    products!: any[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;



    nonAppUserDetails(){

        console.log()
        this.router.navigate(['/uikit/employeetable', { data: true }]);
     }

     employeesDetails(){
        this.router.navigate(['/uikit/employeetable']);
     }


    liveTracking(){
        this.router.navigate(['/uikit/liveTracking']);
    }

    conveyanceSummary(){
        this.router.navigate(['/uikit/conveyanceSummary', { data: true }]);
    }

    fetchUnreadNotifications() {
        this.notificationService.getUnreadNotifications().subscribe(e => {
            this.UnreadNotifications = e; console.log(e), console.log("Unread notifications", this.UnreadNotifications), this.totalRecords = e.length;

        })
    }

    acceptCompOff(id:any){
        this.employeeService.acceptCompOff(id).subscribe(list=>this.getCompOffList())
    }

    rejectCompOff(id:any){
        this.employeeService.rejectCompOff(id).subscribe(list=>this.getCompOffList())
    }

    getCompOffList(){
        this.employeeService.getNonRejectedCompOffList().subscribe(employee=>this.compOffList=employee)
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
