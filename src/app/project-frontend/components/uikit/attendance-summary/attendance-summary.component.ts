import { formatDate } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Attendance } from 'src/app/project-frontend/model/attendance';
import { AttendanceSummary } from 'src/app/project-frontend/model/attendanceSummary';
import { Branch } from 'src/app/project-frontend/model/branch';
import { Pagination } from 'src/app/project-frontend/model/pagination';
import { AttendenceService } from 'src/app/project-frontend/services/attendence.service';
import { BranchService } from 'src/app/project-frontend/services/branch.service';
import { FileService } from 'src/app/project-frontend/services/fileUploadDownload.service';

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styles: [
    `  :host ::ng-deep .red{
        background-color:#F0F8FF;
    }
    :host ::ng-deep .p-toolbar {
    display: contents !important;

    }
    tr.OnLeave{
            color: #ff0000;

        }
        tr.Present{
            color: black;

        }

        @media (min-width: 320px) and (max-width: 767px) {
  .field {
    flex-direction: column;
  }
  .field label {
    margin-bottom: 10px;
  }
  .field p-calendar, .field p-dropdown {
    width: 100%;
  }
  .field p-multiSelect {
    width: 100% !important;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .field {
    flex-direction: row;
  }
  .field label {
    margin-bottom: 0;
  }
  .field p-calendar, .field p-dropdown {
    width: 100%;
  }
  .field p-multiSelect {
    width: 100% !important;
  }
}

@media (min-width: 1024px) {
  .field {
    flex-direction: row;
  }
  .field label {
    margin-bottom: 0;
  }
  .field p-calendar, .field p-dropdown {
    width: 100%;
  }
  .field p-multiSelect {
    width: 100% !important;
  }
}

    `
]
})
export class AttendanceSummaryComponent implements OnInit {
    attendences:AttendanceSummary[] |any;
    addAttendenceForm!: FormGroup;
    editAttendenceForm!: FormGroup;
    submitted: boolean = false;
    productDialog: boolean=false;
    productDialogForEdit : boolean=false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog :boolean =false;
    daysInMonth:any

    format3 : String | undefined;

    attendenceObjectForSelectedDelete : String="";

    ids:any=new Array();
    eventa: Pagination = {
        page: 0,
        rows: 10,
        searchString: '',
        sortBy: 'id',
        sortOrder: 'ascending',
        branch: [],
        role: '',
        conveyanceApplicable: '',
        dateFrom: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd', "en-US"),
        dateTo: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'yyyy-MM-dd', "en-US"),
        onLeave: '',
        nonAppUser: ''
    };
    totalRecords: any;
      branchList:Branch[] = [];
      filterDialog: boolean=false;
      leave!: { label: string; value: string; }[];
      dateFilterVariable!:Date;

      branchFilterVariable!:string;
      leaveFilterVariable!:string;

      constructor(private fileService:FileService,private messageService: MessageService,

        private attendenceService : AttendenceService,private branchService:BranchService) { }

  ngOnInit(): void {
this.dateFilterVariable=new Date(new Date().getFullYear(), new Date().getMonth())
this.daysInMonth=new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    // this.getAttendence();
     this.getAttendances(this.eventa);
     this.branchService.getBranchList2().subscribe(response => {
         this.branchList = response;
         console.log(this.branchList)
         console.log("response", response)
     });
     this.leave = [
         { label: 'On Leave', value:'true' },
         { label: 'Present',value:'false' },

     ];

     this.editAttendenceForm=new FormGroup({

       'id':new FormControl(''),

       'startTime':new FormControl('',[Validators.required]),

       'endTime':new FormControl('',[Validators.required]),

       'onLeave' : new FormControl('',[Validators.required]),

       'reasonForLeave' : new FormControl('',[Validators.required]),

       'employeeAttendance' : new FormControl('',[Validators.required]),

       'dateCreated' : new FormControl('',[Validators.required]),

       'lastUpdated' : new FormControl('',[Validators.required])



   })
   }

   clearAllFilters() {
     this.eventa.branch = [];
     this.eventa.dateFrom=formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1),'yyyy-MM-dd',"en-US");
     this.eventa.dateTo=formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),'yyyy-MM-dd',"en-US")
     this.eventa.onLeave='';
     this.getAttendances(this.eventa)
     this.dateFilterVariable=new Date(new Date().getFullYear(), new Date().getMonth());
     this.daysInMonth=new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
     this.branchFilterVariable='';
     this.leaveFilterVariable='';

 }
   forSearch(event:any){
     this.eventa.searchString=event.target.value
     this.getAttendances(this.eventa)

 }

 branchFilter(event: any) {
    console.log(event)
    // if (event.value.length != 0) {
    //     this.eventa.branch=[]
    //     event.value.forEach((element: { name: any; }) => {
    //         this.eventa.branch.push(element.name);
    //         console.log(this.eventa.branch)
    //         this.getAttendances(this.eventa)
    //     });
    // } else {
    //     this.eventa.branch=[]
    //     this.getAttendances(this.eventa)
    // }
    this.getAttendances(this.eventa)
}

   monthFilter(event:any){
    this.daysInMonth=new Date(event.getFullYear(), event.getMonth() + 1, 0).getDate()
this.eventa.dateFrom=formatDate(new Date(event.getFullYear(), event.getMonth(), 1),'yyyy-MM-dd',"en-US")
 this.eventa.dateTo=formatDate(new Date(event.getFullYear(), event.getMonth() + 1, 0),'yyyy-MM-dd',"en-US")
 console.log(this.eventa)
 console.log(event)
 this.getAttendances(this.eventa)
 console.log(this.eventa)
   }
//    dateFromFilter(event:any){
//      this.eventa.dateFrom=formatDate(event,'yyyy-MM-dd',"en-US")
//      console.log(this.eventa)
//      console.log(event)
//      this.getAttendances(this.eventa)
//        }
 leaveFilter(event:any){
     this.eventa.onLeave=event.value.value;
     this.getAttendances(this.eventa)
 console.log(event)
 }
   hideOrShowFilter(){
 this.filterDialog=!this.filterDialog;
 console.log(this.filterDialog)
   }















 getAttendence(){

         console.log("coming..............");
         this.attendenceService.getAttendanceSummary(this.eventa).subscribe((data: any) =>{

             this.attendences=data.content ;this.totalRecords=data.totalElements

         })

  }









 getAttendances(event: any) {
   this.attendences = [];
   this.eventa.page = event.page;
   this.eventa.rows = event.rows;
   console.log("in page check")
   console.log("page",event.page);
   console.log("Row",event.rows);
   this.attendenceService.getAttendanceSummary(this.eventa).subscribe(e => {
       this.attendences = e.content; console.log(e), this.totalRecords = e.totalElements;
   })
   console.log("event data",event);

 }

 downloadCsv() {
    this.fileService
        .downloadAttendanceSummaryCsv(this.eventa)
        .subscribe(data => {
            const blob1 = new Blob([data], { type: 'text/csv' });
            FileSaver.saveAs(blob1, 'Attendance Summary.csv');
        });
}

}
