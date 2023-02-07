import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { Attendance } from 'src/app/project-frontend/model/attendance';
import { Branch } from 'src/app/project-frontend/model/branch';
import { Pagination } from 'src/app/project-frontend/model/pagination';
import { AttendenceService } from 'src/app/project-frontend/services/attendence.service';
import { BranchService } from 'src/app/project-frontend/services/branch.service';
import { FileService } from 'src/app/project-frontend/services/fileUploadDownload.service';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
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
    `
]
})
export class TestingComponent implements OnInit {
    @ViewChild('paginator', { static: true })
    paginator!: Paginator;

    first = 0;

  attendences:Attendance[] |any;
  addAttendenceForm!: FormGroup;
  editAttendenceForm!: FormGroup;
  submitted: boolean = false;
  productDialog: boolean=false;
  productDialogForEdit : boolean=false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog :boolean =false;
  attendenceObjectForCreate : Attendance=new Attendance();
  attendenceObjectForEdit : Attendance=new Attendance();
  format3 : String | undefined;
  attendenceObjectForDelete : Attendance=new Attendance();
  attendenceObjectForSelectedDelete : String="";
  selectedAttendence : Attendance[]=[];
  ids:any=new Array();
  eventa: Pagination = {
      page: 0,
      rows: 10,
      searchString: '',
      sortBy: 'date',
      sortOrder: 'DESC',
      branch: [],
      role: '',
      conveyanceApplicable: '',
      dateFrom: '',
      dateTo: '',
      onLeave: '',
      nonAppUser: ''
  };
  totalRecords: any;
    branchList:Branch[] = [];
    filterDialog: boolean=false;
    leave!: { label: string; value: string; }[];
    dateFromFilterVariable!:string;
    dateToFilterVariable!:string;
    branchFilterVariable!:string;
    leaveFilterVariable!:string;
    statuses!: { label: string; value: string; }[];


  constructor(private messageService: MessageService,

    private attendenceService : AttendenceService,private branchService:BranchService, private fileService: FileService) { }

  ngOnInit(): void {

    this.statuses = [
        {label: 'ON-LEAVE', value: 'unqualified'},
        {label: 'PRESENT', value: 'qualified'},
        {label: 'COMP-OFF', value: 'proposal'}
    ]

   // this.getAttendence();
    this.getAttendances(this.eventa);
    this.branchService.getBranchList2().subscribe(response => {
        this.branchList = response;
        console.log(this.branchList)
        console.log("response", response)
    });
    this.leave = [
        { label: 'PRESENT',value:'PRESENT' },
        { label: 'LEAVE',value:'ON-LEAVE' },
        { label: 'COMP OFF', value:'COMP-OFF' },
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
    this.eventa.dateFrom='';
    this.eventa.dateTo='';
    this.eventa.onLeave='';
    this.getAttendances(this.eventa)
    this.dateFromFilterVariable='';
    this.dateToFilterVariable='';
    this.branchFilterVariable='';
    this.leaveFilterVariable='';

}
  forSearch(event:any){
    this.eventa.searchString=event.target.value
    this.getAttendances(this.eventa)

}

branchFilter(event: any) {
    this.eventa.page=0
    console.log(event)
    if (event.value.length != 0) {
        this.eventa.branch=[]
        event.value.forEach((element: { name: any; }) => {
            this.eventa.branch.push(element.name);
            console.log(this.eventa.branch)
            this.getAttendances(this.eventa)
        });
    } else {
        this.eventa.branch=[]
        this.getAttendances(this.eventa)
    }
}

  dateToFilter(event:any){
this.eventa.dateTo=formatDate(event,'yyyy-MM-dd',"en-US")
console.log(this.eventa)
console.log(event)
this.getAttendances(this.eventa)
console.log(this.eventa)
  }
  dateFromFilter(event:any){
    this.eventa.page=0
    this.eventa.dateFrom=formatDate(event,'yyyy-MM-dd',"en-US")
    console.log(this.eventa)
    console.log(event)
    this.getAttendances(this.eventa)
      }
leaveFilter(event:any){


    this.eventa.page=0
    this.eventa.onLeave=event.value.value;
    this.getAttendances(this.eventa)
    this.first = 0;
    event.first = 0
console.log(event)
}
  hideOrShowFilter(){
this.filterDialog=!this.filterDialog;
console.log(this.filterDialog)
  }
  hideDialog(){
    // console.log("hideDialog"+this.addAttendenceForm.value.dateCreated);
    // let fd = this.addAttendenceForm.value.dateCreated
    //  fd = new Date();
    //  this.formaterOfDate(fd);
    // console.log("gsgsgsgsggsgsgs"+fd);
    // console.log("nmnmnmnmnmnmnmm"+this.addAttendenceForm.value.dateCreated);
    console.log("hideDialog"+this.addAttendenceForm.value.startTime);
    console.log("------------->",this.attendenceObjectForCreate);
    this.productDialog=false;
    this.submitted=false;
}





editAttendence(attendance:Attendance){
this.editAttendenceForm.patchValue({'id':attendance.id})
if(attendance.onLeave==true){
    console.log("in true filed")
    this.editAttendenceForm.patchValue({'onLeave':"true"})
    console.log(this.editAttendenceForm.value.onLeave)
}else{
    this.editAttendenceForm.patchValue({'onLeave':"false"})
}

    this.productDialogForEdit = true;
    this.getAttendances(this.eventa);
}



  hideDialogForEdit(){
    console.log("obj"+this.attendenceObjectForEdit.startTime);
    console.log("form"+this.editAttendenceForm.value.endTime);
    this.productDialogForEdit = false;
    this.submitted = true;
    this.getAttendances(this.eventa);
  }

  saveAttendenceForEdit(id:number,attendance:Attendance){
    this.attendenceService.updateAttendence(id,attendance).subscribe(data=>{
      console.log("in edit id",id);
      console.log("in edit attendence befor",attendance);
      attendance=data
      console.log("in edit attendence after",attendance);
      this.productDialogForEdit=false;
      this.getAttendances(this.eventa);
    },error=>console.log(error));

  }



getAttendence(){
this.totalRecords=0
        console.log("coming..............");
        this.attendenceService.getAttendenceListWithPagination(this.eventa).subscribe((data: any) =>{
            this.paginator.changePage(0)
            this.attendences=data.content ;this.totalRecords=data.totalElements

        })

 }



onSelectMethod(event: string) {
  let d = new Date(Date.parse(event));
  this.addAttendenceForm.value.dateCreated = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
}





getAttendances(event: any) {
    this.totalRecords=0
  this.attendences = [];
  this.eventa.page = event.page;
  this.eventa.rows = event.rows;
  console.log("in page check")
  console.log("page",event.page);
  console.log("Row",event.rows);
  this.attendenceService.getAttendenceListWithPagination(this.eventa).subscribe(e => {
      this.attendences = e.content; console.log(e), this.totalRecords = e.totalElements;
  })
  console.log("event data",event);

}


downloadCsv() {
    this.fileService
        .downloadAttendances(this.eventa)
        .subscribe(data => {
            const blob1 = new Blob([data], { type: 'text/csv' });
            FileSaver.saveAs(blob1, 'Attendances.csv');
        });
}

}
