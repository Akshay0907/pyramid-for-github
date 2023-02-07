import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Attendance } from 'src/app/project-frontend/model/attendance';
import { Branch } from 'src/app/project-frontend/model/branch';
import { ConveyanceSummary } from 'src/app/project-frontend/model/conveyanceSummary';
import { Pagination } from 'src/app/project-frontend/model/pagination';

import { BranchService } from 'src/app/project-frontend/services/branch.service';
import { ConveyanceService } from 'src/app/project-frontend/services/conveyance.service';
import { FileService } from 'src/app/project-frontend/services/fileUploadDownload.service';

@Component({
  selector: 'app-conveyance-summary',
  templateUrl: './conveyance-summary.component.html',
   styles: [
    `  :host ::ng-deep .red{
        background-color:#F0F8FF;
    }
    :host ::ng-deep .p-toolbar {
    display: contents !important;

    }

    `
]
})
export class ConveyanceSummaryComponent implements OnInit {
    @Input() data: any;
    conveyanceSummary:ConveyanceSummary[] |any;
    addAttendenceForm!: FormGroup;
    editAttendenceForm!: FormGroup;
    submitted: boolean = false;
    productDialog: boolean=false;
    productDialogForEdit : boolean=false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog :boolean =false;
    // attendenceObjectForCreate : Attendance=new Attendance();
    // attendenceObjectForEdit : Attendance=new Attendance();
    format3 : String | undefined;
    // attendenceObjectForDelete : Attendance=new Attendance();
    attendenceObjectForSelectedDelete : String="";
    selectedAttendence : Attendance[]=[];
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
        dateTo: formatDate(new Date(), 'yyyy-MM-dd', "en-US"),
        onLeave: '',
        nonAppUser: ''
    };
    totalRecords: any;
      branchList:Branch[] = [];
      filterDialog: boolean=false;
      leave!: { label: string; value: string; }[];
      dateFromFilterVariable!:Date;
      dateToFilterVariable!:Date;
      branchFilterVariable!:string;
      leaveFilterVariable!:string;

      constructor(private fileService:FileService,private route: ActivatedRoute,private messageService: MessageService,

        private conveyanceService : ConveyanceService,private branchService:BranchService) { }


  ngOnInit(): void {
this.dateFromFilterVariable=new Date(new Date().getFullYear(), new Date().getMonth(), 1)
this.dateToFilterVariable=new Date()
console.log(formatDate(new Date(),'yyyy-MM-dd',"en-US"))

this.route.paramMap.subscribe(params => {
    this.data = params.get('data');
    console.log("activated route working", this.data)
    if (this.data) {
this.dateFromFilterVariable=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1)
this.dateToFilterVariable=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1)
this.eventa.dateFrom= formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1), 'yyyy-MM-dd', "en-US"),
this.eventa.dateTo= formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1), 'yyyy-MM-dd', "en-US")
     }
  });

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
     this.eventa.dateTo=formatDate(new Date(),'yyyy-MM-dd',"en-US");
     this.eventa.onLeave='';
     this.getAttendances(this.eventa)
     this.dateFromFilterVariable=new Date(new Date().getFullYear(), new Date().getMonth(), 1);
     this.dateToFilterVariable=new Date();
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




   dateToFilter(event:any){
 this.eventa.dateTo=formatDate(event,'yyyy-MM-dd',"en-US")
 console.log(this.eventa)
 console.log(event)
 this.getAttendances(this.eventa)
 console.log(this.eventa)
   }
   dateFromFilter(event:any){
     this.eventa.dateFrom=formatDate(event,'yyyy-MM-dd',"en-US")
     console.log(this.eventa)
     console.log(event)
     this.getAttendances(this.eventa)
       }
 leaveFilter(event:any){
     this.eventa.onLeave=event.value.value;
     this.getAttendances(this.eventa)
 console.log(event)
 }
   hideOrShowFilter(){
 this.filterDialog=!this.filterDialog;
 console.log(this.filterDialog)
   }
//    hideDialog(){
//      // console.log("hideDialog"+this.addAttendenceForm.value.dateCreated);
//      // let fd = this.addAttendenceForm.value.dateCreated
//      //  fd = new Date();
//      //  this.formaterOfDate(fd);
//      // console.log("gsgsgsgsggsgsgs"+fd);
//      // console.log("nmnmnmnmnmnmnmm"+this.addAttendenceForm.value.dateCreated);
//      console.log("hideDialog"+this.addAttendenceForm.value.startTime);
//      console.log("------------->",this.attendenceObjectForCreate);
//      this.productDialog=false;
//      this.submitted=false;
//  }





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



//    hideDialogForEdit(){
//      console.log("obj"+this.attendenceObjectForEdit.startTime);
//      console.log("form"+this.editAttendenceForm.value.endTime);
//      this.productDialogForEdit = false;
//      this.submitted = true;
//      this.getAttendances(this.eventa);
//    }

//    saveAttendenceForEdit(id:number,attendance:Attendance){
//      this.conveyanceSummaryervice.updateAttendence(id,attendance).subscribe(data=>{
//        console.log("in edit id",id);
//        console.log("in edit attendence befor",attendance);
//        attendance=data
//        console.log("in edit attendence after",attendance);
//        this.productDialogForEdit=false;
//        this.getAttendances(this.eventa);
//      },error=>console.log(error));

//    }



 getAttendence(){

         console.log("coming..............");
         this.conveyanceService.getRideSummary(this.eventa).subscribe((data: any) =>{

             this.conveyanceSummary=data.content ;this.totalRecords=data.totalElements

         })

  }



 onSelectMethod(event: string) {
   let d = new Date(Date.parse(event));
   this.addAttendenceForm.value.dateCreated = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
 }





 getAttendances(event: any) {
   this.conveyanceSummary = [];
   this.eventa.page = event.page;
   this.eventa.rows = event.rows;
   console.log("in page check")
   console.log("page",event.page);
   console.log("Row",event.rows);
   this.conveyanceService.getRideSummary(this.eventa).subscribe(e => {
       this.conveyanceSummary = e.content; console.log(e), this.totalRecords = e.totalElements;
   })
   console.log("event data",event);

 }

 downloadCsv() {
    this.fileService
        .downloadRidesSummaryCsv(this.eventa)
        .subscribe(data => {
            const blob1 = new Blob([data], { type: 'text/csv' });
            FileSaver.saveAs(blob1, 'Conveyance Summary.csv');
        });
}
}
