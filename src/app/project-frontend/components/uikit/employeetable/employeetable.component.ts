import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, SelectItem, MenuItem } from 'primeng/api';



import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/project-frontend/services/employee.service';
import { Employee } from 'src/app/project-frontend/model/employee';
import { Address } from 'src/app/project-frontend/model/address';
import { Branch } from 'src/app/project-frontend/model/branch';
import { User } from 'src/app/project-frontend/model/user';
import { Vehicle } from 'src/app/project-frontend/model/vehicle';
import { StateService } from 'src/app/project-frontend/services/state.service';
import { State } from 'src/app/project-frontend/model/states.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console, time } from 'console';
import { BranchService } from 'src/app/project-frontend/services/branch.service';
import { FileService } from 'src/app/project-frontend/services/fileUploadDownload.service';
import { Pagination } from 'src/app/project-frontend/model/pagination';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import { formatDate } from '@angular/common';





interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './employeetable.component.html',
    providers: [ConfirmationService],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;

        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }

        .frozen-column {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: white;
    overflow: hidden;
  }

  .non-frozen-column {
    position: relative;
  }
  .p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover {
     background: #e9ecef;
     color: white;
     overflow:auto;
}
tr:hover {
  background-color: #e9ecef;
}
.header-style {
    /* width:12%;
  min-width: 8rem; */
  width:200px

}
/* :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
  background-color: light-grey !important;
  color: black !important;
  font-weight: bold !important;
  text-align: left !important;
  width: 14%;
  min-width: 8rem;
  text-align: left;
} */




    `]

})
export class EmployeeTableComponent implements OnInit {
    @Input() data: any;
    rowGroupMetadata: any;
    @ViewChild('filter') filter!: ElementRef;
    employee: Employee[] = [];
    branchList: Branch[] = [];
    productDialog: boolean = false;
    deleteEmployeeDialog: boolean = false;
    deleteProductsDialog: boolean = false;


    selectedEmployees: Employee[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    branch: any;
    rowsPerPageOptions = [5, 10, 20];
    States!: State[];
    stateList!: SelectItem[];
    DistrictList!: SelectItem[];
    selectedState!: any;
    stringifiedData: any;
    //selectedDistrict: any;
    showFields: boolean = true;
    role: any[] = [];
    addEmployeeForm!: FormGroup;
    showPassword!: Boolean;
    vehicleDisable!: boolean;
    blockSpecialNumber: RegExp = /^[^<>*!0-9]+$/;
    blockOnSearch: RegExp = /^[^<>*!%]+$/;
    conveyance!: { label: string; }[];
    mobile!: boolean;
    userName!: string;
    unBlockDialog:Boolean=false;
    UnBlockUserName: any;

    constructor(private route: ActivatedRoute,private stateService: StateService, private employeeService: EmployeeService,
        private router: Router, private messageService: MessageService, private fb: FormBuilder, private branchService: BranchService, private fileService: FileService) { }

    setofvehicle: any;
    employeeToSave!: Employee;
    variable!: string;
    createEditchecker!: boolean;
    totalRecords: any;
    showFilter: boolean = true;

    eventa: Pagination = {
        page: 0,
        rows: 10,
        searchString: '',
        sortBy: 'firstName',
        sortOrder: 'ascending',
        branch: [],
        role: '',
        conveyanceApplicable: '',
        dateFrom: '',
        dateTo: '',
        onLeave: '',
        nonAppUser: ''
    };

    ngOnInit() {
        this.data=null
        this.route.paramMap.subscribe(params => {
            this.data = params.get('data');
            console.log("activated route working", this.data)
            if (this.data) {
                this.callMethod();
             }
          });



        console.log("screen ki pixel", window.screen.width);
        if (window.screen.width < 768) { // 768px portrait
            this.mobile = true;
            console.log("mobile k liye", this.mobile);
        }
        this.branchService.getBranchList2().subscribe(response => {
            this.branchList = response;
            console.log(this.branchList)
            console.log("response", response)
        });
        this.role = [
            { label: 'Admin', value: 'Admin' },
            { label: 'Employee', value: 'Employee' },

        ];




        this.conveyance = [
            { label: 'true' },
            { label: 'false' },

        ];


        this.addEmployeeForm = this.fb.group({
            empNo: ['', [Validators.required]],
            id: [''],
            firstName: ['', [Validators.required]],
            middleName: [''],
            lastName: ['', [Validators.required]],
            emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
            primaryContactNo: ['', [Validators.required, Validators.min(6000000000), Validators.max(9999999999)]],
            secondaryContactNo: ['', [Validators.min(6000000000), Validators.max(9999999999)]],
            userName: [''],
            passhash: ['', [Validators.required]],
            isAdmin: [false],
            fatherName: ['', [Validators.required]],
            uid: ['', [Validators.maxLength(12), Validators.minLength(12)]],
            houseNo: ['', [Validators.required]],
            village: ['', [Validators.required]],
            city: ['', [Validators.required]],
            district: ['', [Validators.required]],
            state: ['', [Validators.required]],
            role: ['', [Validators.required]],
            dob: new Date(),
            active: true,
            deleted: false,
            vehicleName: ['', [Validators.required]],
            vehicleNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[-][0-9]{1,2}[-][A-Z]{1,2}[-][0-9]{3,4}$')]],
            conveyanceApplicable: [false, [Validators.required]],
            branch: ['']
        });

        console.log(this.eventa);

        this.checkBranch(this.eventa);
        this.getStates();
        this.cols = [
            { field: 'empNo', header: 'Employee No.' },
            { field: 'firstName', header: 'First Name' },
            { field: 'middleName', header: 'Middle Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'emailId', header: 'Email Id' },
            { field: 'branchEmployee.name', header: 'Branch Name' },
            { field: 'primaryContactNo', header: 'Primary Contact Number' },
            { field: 'secondaryContactNo', header: 'Secondary Contact Number' },
            { field: 'uid', header: 'Addhaar Card' }
        ];
        console.log(this.addEmployeeForm.value.role);



    }
    unBlockUser(username:any){
        this.unBlockDialog = true
        this.UnBlockUserName=username;
    }
    clearAllFilters() {
        this.eventa.branch = [];
        this.eventa.role = '';
        this.eventa.conveyanceApplicable = '';
        this.eventa.nonAppUser='';
        this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
            this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
        })
    }


    branchFilter(event: any) {
        console.log(event)
        if (event.value.length != 0) {
            this.eventa.branch=[]
            event.value.forEach((element: { name: any; }) => {
                this.eventa.branch.push(element.name);
                console.log(this.eventa.branch)
                 this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
             this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
         })
            });
        } else {
            this.eventa.branch=[]
            this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
                this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
            })
        }
    }



//     branchFilter(event: any) {
//         console.log(event)
//         this.eventa.branch = event.value.forEach(element =>

// this.eventa.branch.push(element.name)
//         );
        // this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
        //     this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
        // })

   // }
    roleFilter(event: any) {
        this.eventa.role = event.value.label;
        this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
            this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
        })
    }
    conveyanceFilter(event: any) {
        this.eventa.conveyanceApplicable = event.value.label;
        this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
            this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
        })
    }
    sorting(event: any, field: string) {
        console.log(field)
        console.log(event)
        // console.log(event.target.ariaSort)
        // console.log(event.target.innerText)
        this.eventa.sortBy = field;
        this.eventa.sortOrder = (this.eventa.sortOrder == "ascending") ? "descending" : "ascending";
        //this.eventa.sortOrder = event.target.ariaSort=="none"||"ascending"?'ascending':'descending'
        this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
            this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
        })
    }


    checkpurpose(event: any) {
        this.employee = [];

        this.eventa.searchString = event.target.value;
        this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
            this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
        })
    }
    checkBranch(event: any) {
        this.employee = [];
        this.eventa.page = event.page;
        this.eventa.rows = event.rows;
        console.log("in page check")
        this.employeeService.getSearchedAndFilteredEmployee(this.eventa).subscribe(e => {
            this.employee = e.content; console.log(e), this.totalRecords = e.totalElements;
        })
        console.log(event);
        console.log(this.employee);
    }
    checkConveyance(event: any) {
        if (event.checked == true) {
            this.vehicleDisable = false;
            let control = this.addEmployeeForm.controls['vehicleName']
            control.setValidators([Validators.required]);
            control.updateValueAndValidity();
            let control1 =
                this.addEmployeeForm.controls['vehicleNumber']
            control1.setValidators([Validators.required, Validators.pattern('^[A-Z]{2}[-][0-9]{1,2}[-][A-Z]{1,2}[-][0-9]{3,4}$')]);

            control1.updateValueAndValidity()
            console.log(this.addEmployeeForm.controls)

        }
        else {
            this.vehicleDisable = true;
            let control = this.addEmployeeForm.controls['vehicleName']
            control.clearValidators();
            control.setValue(null)
            control.updateValueAndValidity()
            let control1 =
                this.addEmployeeForm.controls['vehicleNumber']
            control1.clearValidators()
            control1.setValue(null)
            control1.updateValueAndValidity()
            console.log("vwbkkhrvbwkvsbvksbvskhvbdvkhsbvsdkhvbshvsbvkhsbvkhsvbskh")
        }

    }
    newForm() {
        this.createEditchecker = true;
        this.addEmployeeForm.reset();
        this.submitted = false;
        this.showPassword = true;
        this.DistrictList = [];
        console.log(this.addEmployeeForm.value.firstName);
        this.addEmployeeForm.get('middleName')?.clearValidators();
        //this.addEmployeeForm.get('secondaryContactNo')?.clearValidators();
        this.addEmployeeForm.get('userName')?.clearValidators();
        this.addEmployeeForm.patchValue({
            'role': "Employee",
            'conveyanceApplicable': false
        });
        this.vehicleDisable = true;
        this.addEmployeeForm.controls['vehicleName'].clearValidators()
        this.addEmployeeForm.controls['vehicleNumber'].clearValidators()
        console.log(this.addEmployeeForm.value.role)
        this.productDialog = true;
        this.userName = '';

    }
    retrieveEmployees(): void {
        this.employeeService.getSearchedAndFilteredEmployee(this.eventa)
            .subscribe({
                next: (data) => {
                    this.employee = data.content;
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
            this.selectedEmployees=[]
    }


    deletingEmployee(employeeToSetDelete: any) {
        this.employeeService.deleteEmployee(employeeToSetDelete).subscribe(data => {


            this.retrieveEmployees();
        })
    }
    deleteselectedEmployees(employees: Employee[]) {
        console.log(employees);
        let ids;
        ids = new Array();
        employees.forEach(e => ids.push(e.id));
        console.log(ids);
        this.employeeService.deleteEmployee(ids).subscribe(data => {


            this.retrieveEmployees();
        })
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.employee) {
            for (let i = 0; i < this.employee.length; i++) {
                const rowData = this.employee[i];
                const empName = rowData?.firstName || '';

                if (i === 0) {
                    this.rowGroupMetadata[empName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.employee[i - 1];
                    const previousRowGroup = previousRowData?.firstName;
                    if (empName === previousRowGroup) {
                        this.rowGroupMetadata[empName].size++;
                    }
                    else {
                        this.rowGroupMetadata[empName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    clickablebutton() {
        this.router.navigate(['employeeka']);
    }

    unBlockEmployee(){
this.employeeService.unBlockEmployee(this.UnBlockUserName).subscribe(s=>this.retrieveEmployees());
this.unBlockDialog=false;


    }


    editProduct(employee: Employee) {
        this.addEmployeeForm.reset();
        this.createEditchecker = false;
        this.selectedState = this.States.find(s => s.state == employee.employeeAddress.state)
        console.log(employee.employeeAddress.district)
        console.log(this.selectedState)
        this.getDistricts();
        //         console.log(this.DistrictList)
        //          this.selectedDistrict=this.selectedState.districts.find((d: { label: string; })=>d.label=employee.employeeAddress.district)
        // console.log(this.selectedDistrict)

        this.addEmployeeForm.patchValue({
            'id': employee.id,
            'firstName': employee.firstName,
            'middleName': employee.middleName,
            'lastName': employee.lastName,
            'fatherName': employee.fatherName,
            'dob': new Date(employee.dob),
            'uid': employee.uid,
            'primaryContactNo': employee.primaryContactNo,
            'secondaryContactNo': employee.secondaryContactNo,
            'emailId': employee.emailId,
            'houseNo': employee.employeeAddress.houseNo,
            'village': employee.employeeAddress.village,
            'city': employee.employeeAddress.city,
            'state': this.selectedState,
            'district': employee.employeeAddress.district,
            'empNo': employee.empNo,
            'userName': employee.userEmployee.userName,
            'conveyanceApplicable':employee.userEmployee.conveyanceApplicable,
            'passhash': employee.userEmployee.passHash,
            'isAdmin': employee.userEmployee.isAdmin,
            'role': employee.role,
            'branch': employee.branchEmployee.id,


        })


        //console.log(this.selectedState)
        if (this.addEmployeeForm.value.role == "Admin") {
            this.addEmployeeForm.patchValue({
                'isAdmin': true
            })
        } else
            this.addEmployeeForm.patchValue({
                'role': "Employee",
                'isAdmin': false
            })

        if (employee.userEmployee.conveyanceApplicable == true) {
            // this.showFields = true;
            this.vehicleDisable=false
            this.addEmployeeForm.patchValue({
                'vehicleName': employee.employeeVehicle.vehicleName,
                'vehicleNumber': employee.employeeVehicle.vehicleNumber
            }
            )
        } else {this.vehicleDisable = true
            let control = this.addEmployeeForm.controls['vehicleName']
            control.clearValidators();
            control.setValue(null)
            control.updateValueAndValidity()
            let control1 =
                this.addEmployeeForm.controls['vehicleNumber']
            control1.clearValidators()
            control1.setValue(null)
            control1.updateValueAndValidity()}
        //this.selectedState = employee.employeeAddress.state;
        // this.showPassword=false;
        if (this.showFields == false) {
            this.showPassword = true
            this.addEmployeeForm.controls['passhash'].setValidators([Validators.required])
        } else {
            this.showPassword = false
            this.addEmployeeForm.controls['passhash'].clearValidators();
        }

        this.productDialog = true;

        console.log(this.addEmployeeForm);
        //console.log(employee.employeeAddress.address);
    }



    // confirmDeleteSelected() {
    //     this.deleteProductsDialog = false;
    //     this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    //    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //     this.selectedProducts = [];
    // }

    // confirmDelete() {
    //     this.deleteProductDialog = false;
    //     this.products = this.products.filter(val => val.id !== this.product.id);
    //    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //     this.product = {};
    // }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.showFields = true;

    }

    hideOtherFields(employee: Employee) {
        this.showFields = false;
        this.showPassword = true;
        this.editProduct(employee);
    }

    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name?.trim()) {
    //         if (this.product.id) {
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
    //             this.products[this.findIndexById(this.product.id)] = this.product;
    //            // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.code = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
    //             this.products.push(this.product);
    //            // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         this.products = [...this.products];
    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }




    getStates() {

        this.States = [];
        this.stateService.getStateName().subscribe(res => {
            this.States = res['states'];
            this.stateList = [];
            for (let i = 0; i < this.States.length; i++) {
                this.stateList.push({ 'label': this.States[i].state, 'value': this.States[i] });
            }
        });
    }
    getDistricts() {
        this.DistrictList = [];
        if (this.addEmployeeForm.value.state)
            this.selectedState = this.addEmployeeForm.value.state
        // this.employeeObject.employeeAddress.district="null";
        console.log("in district ittrator", this.selectedState);

        if (this.selectedState.districts != undefined) {
            for (let i = 0; i < this.selectedState.districts.length; i++) {
                this.DistrictList.push({ 'label': this.selectedState.districts[i], 'value': this.selectedState.districts[i] });
            }
        }
        console.log(this.DistrictList)
    }


    extractValue(): Employee {

        const value = this.addEmployeeForm.value;
        const employeeProfile = new Employee();
        if (value.id) {
            employeeProfile.id = value.id
        }

        employeeProfile.empNo = value.empNo;
        employeeProfile.firstName = value.firstName;
        employeeProfile.middleName = value.middleName;
        employeeProfile.lastName = value.lastName;
        employeeProfile.fatherName = value.fatherName;
        employeeProfile.dob = new Date(formatDate(value.dob,'yyyy-MM-dd',"en-US"));
        employeeProfile.uid = value.uid;
        employeeProfile.emailId = value.emailId;
        employeeProfile.primaryContactNo = value.primaryContactNo;
        employeeProfile.secondaryContactNo = value.secondaryContactNo;
        employeeProfile.role = value.role

        let branch
        branch = new Branch();
        console.log(value.branch);
        branch.id = value.branch;
        employeeProfile.branchEmployee = branch;
        let employeeKaAddress;
        employeeKaAddress = new Address();
        employeeKaAddress.houseNo = value.houseNo;
        employeeKaAddress.village = value.village
        employeeKaAddress.city = value.city;
        employeeKaAddress.state = this.selectedState.state;
        employeeKaAddress.district = value.district;
        //console.log(this.selectedDistrict);
        employeeProfile.employeeAddress = employeeKaAddress;

        let user
        user = new User();
        user.userName = value.firstName + value.empNo;
        user.conveyanceApplicable = value.conveyanceApplicable,

            user.passHash = value.passhash;
        employeeProfile.userEmployee = user
        let vehicle
        vehicle = new Vehicle();
        if (value.conveyanceApplicable != false) {

            vehicle.vehicleName = value.vehicleName;
            vehicle.vehicleNumber = value.vehicleNumber;
        }
        else {
            vehicle.vehicleName = "";
            vehicle.vehicleNumber = "";
        }




        employeeProfile.employeeVehicle = vehicle;
        if (employeeProfile.role == "Admin") {
            employeeProfile.userEmployee.isAdmin == true
        } else
            employeeProfile.userEmployee.isAdmin == false

        return employeeProfile;
        console.log(employeeProfile);
    }

    addEmployeeInProject() {

        console.log(this.createEditchecker);
        this.employeeToSave = this.extractValue();
        this.submitted = true;
        console.log(this.employeeToSave);
        console.log(this.addEmployeeForm.value);
        console.log(this.addEmployeeForm.valid);
        if (this.addEmployeeForm.valid) {
            console.log(this.employeeToSave.userEmployee.conveyanceApplicable);

            if (this.createEditchecker === true) {
                console.log("update", this.employeeToSave.userEmployee.isAdmin);
                this.stringifiedData = JSON.stringify(this.employeeToSave);
                console.log("With Stringify :", this.stringifiedData);
                this.employeeService.addEmployee(this.employeeToSave).subscribe(data => {
                    console.log(data);
                    this.productDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Saved', life: 3000 });
                    this.retrieveEmployees();
                }, error => console.log(error)
                )

                    ;
                this.productDialog = false;
                this.showFields = true;
                console.log("update", this.employeeToSave.userEmployee.isAdmin);
            }
            if (this.createEditchecker === false) {
                // console.log("update",this.employeeObject.id);
                this.employeeService.editEmployee(this.employeeToSave).subscribe(data => {
                    console.log(data);
                    this.productDialog = false;
                    this.showFields = true;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated Successfully', life: 3000 });
                    this.addEmployeeForm.reset();
                    this.retrieveEmployees();
                }, error => console.log(error)
                )

                    ;
                this.productDialog = false;
                this.showFields = true;


            }

        }
    }

    myUploader(event: any) {
        console.log("event", event)
        this.fileService.addFile(event.files[0]).subscribe(e =>
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entries Updated Successfully', life: 3000 })
            ,
            error => {
                this.messageService.add({ severity: 'error', summary: 'Unsuccessful', detail: 'Entries not Updated', life: 3000 })
            });

        setTimeout(() => {
            this.retrieveEmployees()
        }, 10000 / 4);
        //  setInterval(()=> { this.retrieveEmployees() },  10000/2);

    }


    setuserName() {
        this.addEmployeeForm.patchValue({ 'usename': this.addEmployeeForm.value.firstName + this.addEmployeeForm.value.empNo });
        this.userName = this.addEmployeeForm.value.firstName + this.addEmployeeForm.value.empNo;
        console.log(this.userName);
    }
    downloadCsv() {
        this.fileService
            .downloadEmployees(this.eventa)
            .subscribe(data => {
                const blob1 = new Blob([data], { type: 'text/csv' });
                FileSaver.saveAs(blob1, 'Employees.csv');
            });
    }



    callMethod() {
       this.eventa.nonAppUser="true";
       this.retrieveEmployees()
     }


}


