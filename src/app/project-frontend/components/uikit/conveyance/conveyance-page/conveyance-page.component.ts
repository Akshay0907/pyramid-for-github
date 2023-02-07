import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Branch } from 'src/app/project-frontend/model/branch';
import { Employee } from 'src/app/project-frontend/model/employee';
//import { Page } from 'src/app/project-frontend/model/page.model copy';
import { Pagination } from 'src/app/project-frontend/model/pagination';
import { Ride } from 'src/app/project-frontend/model/ride';
import { BranchService } from 'src/app/project-frontend/services/branch.service';
import {ConveyanceService} from 'src/app/project-frontend/services/conveyance.service';
import { FileService } from 'src/app/project-frontend/services/fileUploadDownload.service';

@Component({
  selector: 'app-conveyance-page',
  templateUrl: './conveyance-page.component.html',
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
export class ConveyancePageComponent implements OnInit {

  rides:Ride[] |any;
  addConveyanceForm!:FormGroup ;
  submitted: boolean = false;
  productDialog: boolean=false;
  rideObjectForCreate : Ride=new Ride();
  editConveyanceForm!: FormGroup;
  productDialogForEdit: boolean = false;
  rideObjectForEdit : Ride=new Ride();
  deleteProductDialog : boolean=false;
  rideObjectForDelete : Ride=new Ride();
  deleteProductsDialog :boolean =false;
  rideObjectForSelectedDelete : Ride=new Ride();
  ids:any=new Array();
  selectedRide : Ride[]=[];
  employee:Employee=new Employee();
  employees!  :any[];
  employeeName : string="";
  eventa: Pagination = {
      page: 0,
      rows: 10,
      searchString: "",
      sortBy: 'rideDate',
      sortOrder: 'descending',
      branch: [],
      role: '',
      conveyanceApplicable: '',
      dateFrom: '',
      dateTo: '',
      onLeave: '',
      nonAppUser: ''
  };
  totalRecords: any;
  branchList: Branch[] = [];
  rideListForSearching : Ride[] =[];
  filterForm! :FormGroup;
  branchObject: Branch | undefined;
  dateFromFilterVariable!:string;
  dateToFilterVariable!:string;
  branchFilterVariable!:string;

  constructor(private messagrService : MessageService,

    private conveyanceService : ConveyanceService,

    private branchService : BranchService, private fileService: FileService) { }

  ngOnInit(): void {
    //this.getRides();

    this.checkBranch(this.eventa);

    this.addConveyanceForm=new FormGroup({

      'rideDate':new FormControl('',[Validators.required]),

      'rideStartTime':new FormControl('',[Validators.required]),

      'rideEndTime' : new FormControl('',[Validators.required]),

      'rideCost' : new FormControl('',[Validators.required]),

      'rideDistance' : new FormControl('',[Validators.required]),

      'reason' : new FormControl('',[Validators.required]),

      'sanctionDistance' : new FormControl('',[Validators.required]),

      'employeeRide' : new FormControl('',[Validators.required]),

      'ridenavigationpointRideLocations' : new FormControl('',[Validators.required]),

      'dateCreated' : new FormControl('',[Validators.required]),

      'lastUpdated' : new FormControl('',[Validators.required]),

      'reimburementCost' : new FormControl('',[Validators.required])



  });

  this.editConveyanceForm=new FormGroup({

     'id':new FormControl(''),

    'rideDate':new FormControl('',[Validators.required]),

    'rideStartTime':new FormControl('',[Validators.required]),

    'rideEndTime' : new FormControl('',[Validators.required]),

    'rideCost' : new FormControl('',[Validators.required]),

    'rideDistance' : new FormControl('',[Validators.required]),

    'reason' : new FormControl('',[Validators.required]),

    'sanctionDistance' : new FormControl('',[Validators.required]),

    'employeeRide' : new FormControl('',[Validators.required]),

    'ridenavigationpointRideLocations' : new FormControl('',[Validators.required]),

    'dateCreated' : new FormControl('',[Validators.required]),

    'lastUpdated' : new FormControl('',[Validators.required]),

    'reimburementCost' : new FormControl('',[Validators.required])



});

this.filterForm = new FormGroup({

  'startDate' : new FormControl(''),

  'endDate' : new FormControl(''),

  'branch' : new FormControl(''),

  'staffName' : new FormControl('')

});



this.branchService.getBranchList2().subscribe(response => {
  this.branchList = response;
  console.log(this.branchList)
  console.log("response", response)
});

  }
  clearAllFilters() {
    this.eventa.branch = [];
    this.eventa.dateFrom='';
    this.eventa.dateTo='';
    this.checkBranch(this.eventa)
    this.dateFromFilterVariable='';
    this.dateToFilterVariable='';
    this.branchFilterVariable='';

}

forSearch(event:any){
    this.eventa.searchString=event.target.value
    this.checkBranch(this.eventa)

}

branchFilter(event: any) {
    this.eventa.page=0
    console.log(event)
    if (event.value.length != 0) {
        this.eventa.branch=[]
        event.value.forEach((element: { name: any; }) => {
            this.eventa.branch.push(element.name);
            console.log(this.eventa.branch)
            this.checkBranch(this.eventa)
        });
    } else {
        this.eventa.branch=[]
        this.checkBranch(this.eventa)
    }
}

      dateToFilter(event:any){
    this.eventa.dateTo=formatDate(event,'yyyy-MM-dd',"en-US")


    this.checkBranch(this.eventa)

      }
      dateFromFilter(event:any){
        this.eventa.dateFrom= formatDate(event,'yyyy-MM-dd',"en-US")

        ;
        console.log()
        this.eventa.page=0

        this.checkBranch(this.eventa)
          }
    leaveFilter(event:any){
        this.eventa.onLeave=event.value.value;
        this.eventa.page=0
        this.checkBranch(this.eventa)

    }

  onGlobalFilter(table: Table, event: Event) {

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');

}

getRides(){

  console.log("coming..............");
  this.conveyanceService.getRideWithSearchingAndFiltering(this.eventa).subscribe((data: any) =>{

      this.rides=data.content; this.totalRecords=data.totalElements
      console.log("tyytytyyty",data);
      //this.getEmployeeNameFromEmployeeId(data.employeeRide);
    //   console.log("rides",this.rides);
    //   for(let i=0;i<this.rides.length;i++){
    //   console.log("employeeId",this.rides[i]);
    //     this.getEmployeeNameFromEmployeeId(this.rides[i].employeeRide);}

    // this.rides.employeeRide=this.employee.firstName;
    // console.log("name",this.employees[0])
    // console.log("staffname",this.rides.employeeRide)
    //   console.log("data",data);
    //   console.log("employee ",this.employee);
    //   console.log("employee Mame",this.employeeName);

  })

}

openNew(){

  console.log("comeing in openNew()");

  this.submitted = false;

  this.productDialog = true;

  console.log("comeing in openNew()23");
}

hideDialog(){
  console.log("hideDialog"+this.addConveyanceForm.value.employeeRide);
  this.productDialog=false;
  this.submitted=false;
}



editRideInHeader(ride:Ride){
this.editConveyanceForm.patchValue({'sanctionDistance':ride.sanctionDistance,'id':ride.id})
console.log("ride=============================================",ride.sanctionDistance)

    this.productDialogForEdit = true;
    this.getRides();
}



hideDialogForEdit(){
  console.log("editform",this.editConveyanceForm.value);
  console.log("objectvalue",this.rideObjectForEdit);

  this.productDialogForEdit=false;
  this.submitted=false;
}

editRide(id:number,ride:Ride){
  console.log("id",id);
  console.log("Ride",ride);
  this.conveyanceService.updateRide(id,ride).subscribe(data=>{
    ride=data
    this.productDialogForEdit=false;
    this.getRides();
  },error=>console.log(error));
}

deleteRide(ride:Ride){
  this.deleteProductDialog = true;
  this.rideObjectForDelete=ride;
}



checkBranch(event: any) {
  this.rides = [];
  this.eventa.page = event.page;
  this.eventa.rows = event.rows;
  console.log("in page check")
  console.log("page",event.page);
  console.log("Row",event.rows);
  this.conveyanceService.getRideWithSearchingAndFiltering(this.eventa).subscribe(e => { console.log(e)
      this.rides = e.content; console.log(e), this.totalRecords = e.totalElements;
  })
  console.log("event data",event);

}

checkpurpose(event: any) {
  this.rides = [];
  if(this.eventa.searchString!=null ){

  this.eventa.searchString = event.searchString;}
  else{
    this.eventa.searchString = "";
  }

  this.eventa.branch = event.branch;

  this.eventa.branch=this.filterForm.value.branch;
  console.log("obj",this.branchObject);
  console.log("event=======",event);
  console.log("form<<<<<<<<<<",this.filterForm.value);
  console.log("eventa___________",this.eventa.branch)
  //this.eventa.branch=this.methodForBranch(event.branch)
  this.conveyanceService.getRideWithSearchingAndFiltering(this.eventa).subscribe(e => {
    this.rides = e.content; console.log(e),
    this.totalRecords = e.totalElements;
    console.log(this.rides)
    console.log(this.totalRecords)
  })
}

downloadCsv() {
    this.fileService
        .downloadRides(this.eventa)
        .subscribe(data => {
            const blob1 = new Blob([data], { type: 'text/csv' });
            FileSaver.saveAs(blob1, 'Rides.csv');
        });
}
}
