import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Branch } from 'src/app/project-frontend/model/branch';
import { BranchService } from 'src/app/project-frontend/services/branch.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StateService } from 'src/app/project-frontend/services/state.service';
import { State } from 'src/app/project-frontend/model/states.model';



@Component({
    selector: 'app-branch-list',
    templateUrl: './branch-list.component.html',
    styleUrls: ['./branch-list.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class BranchListComponent implements OnInit {

    id!: number;
    branch!: Branch[];

    @ViewChild('filter') filter!: ElementRef;

    deleteBranchDialog: boolean = false;

    deleteBranchesDialog: boolean = false;

    createEditBranchDialog: boolean = false;

    selectedBranchs: Branch[] = [];

    cols: any[] = [];

    branchs: Branch[] = [];

    branchObjectForEdit: Branch = new Branch();

    branchObjectForDelete: Branch = new Branch();

    clickedSubmit: boolean = false;

    branchObjectForSelectedDelete: String = "";

    ids: any = new Array();

    addBranchForm!: FormGroup;

    createEditBranchForm!: FormGroup;

    States!: State[];

    stateList!: SelectItem[];

    selectedState!: any;

    DistrictList!: SelectItem[];

    selectedDistrict: any;

    isEditBranch: boolean = false;
    branchModel: Branch = new Branch();
    selectedBranchState: any;
    selectedBranchDistrict: any;
    districts = []

    districtList = [];




    constructor(private branchService: BranchService,
        private router: Router,
        private messageService: MessageService,
        private stateService: StateService) { }

    ngOnInit(): void {
        this.getBranch();

        this.createEditBranchForm = new FormGroup({
            'id': new FormControl(),
            'name': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
            'address': new FormControl('', [Validators.required, Validators.maxLength(40)]),
            'district': new FormControl('', [Validators.required, Validators.maxLength(40)]),
            'city': new FormControl('', [Validators.required, Validators.maxLength(40)]),
            'state': new FormControl('', [Validators.required, Validators.maxLength(40)]),
            'latitude': new FormControl('', [Validators.required]),
            'longitude': new FormControl('', [Validators.required])
        })

        this.getStates();


    }

    getBranch() {
        this.branchService.getBranchList2().subscribe(response => {
            this.branchs = response;
        });
    }



    //   deleteBranch(id: number) {
    //     this.branchService.deleteAllSelectedBranch(id).subscribe(data => {
    //       this.getBranch();
    //     })
    //   }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    deleteSelectedProducts(branch: Branch[]) {
        for (let i = 0; i < branch.length; i++) {
            this.ids.push(branch[i].id);
        }
        this.deleteBranchesDialog = true;
        this.getBranch();
    }

    confirmDeleteSelected() {
        this.deleteBranchesDialog = false;
        this.deleteBranchesDialog = false;
        this.branchService.deleteAllSelectedBranch(this.ids).subscribe(data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Branches Deleted', life: 3000 });
            this.getBranch();
        }, error => {
            if (error = 409) {
                this.messageService.add({ severity: 'error', summary: 'Unsuccessful', detail: 'Cannot delete branch with employees', life: 3000 });
            }
            console.log(error)
        })


        this.selectedBranchs = [];
        this.getBranch();
    }

    confirmDelete(id: number) {
        this.deleteBranchDialog = false;
        this.branchService.deleteAllSelectedBranch(id).subscribe(data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Branch Deleted', life: 3000 });
            this.getBranch();
        }, error => {
            if (error = 409) {
                this.messageService.add({ severity: 'error', summary: 'Unsuccessful', detail: 'Cannot delete branch with employees', life: 3000 });
            }
            console.log(error)
        })

    }

    deleteProduct(branch: any) {
        this.deleteBranchDialog = true;
        this.getBranch();
        this.branchObjectForDelete = branch
    }



    openBranchDialog(branch: any, isEdit: boolean) {
        this.createEditBranchForm.reset();
        this.isEditBranch = isEdit;
        this.createEditBranchDialog = true;;
        if (isEdit)
            this.getBranchById(branch);

    }
    getBranchById(branch: Branch) {

        this.selectedBranchState = this.States.find(s => s.state == branch.state);
        this.districtList = this.selectedBranchState.districts;
        this.selectedBranchDistrict = this.selectedBranchState.districts.find(((d: any) => d.district == branch.district))
        this.getDistricts();

        this.createEditBranchForm.patchValue({
            id: branch.id,
            name: branch.name,
            address: branch.address,
            city: branch.city,
            state: this.selectedBranchState,
            district: branch.district,
            latitude: branch.latitude,
            longitude: branch.longitude

        });



    }



    saveBranch() {
        this.clickedSubmit = true;
        if (this.getChangedValuesAndValidate()) {
            this.createEditBranchForm.patchValue({ state: this.createEditBranchForm.value.state.state, })
            this.districts = this.createEditBranchForm.value.state.districts
            if (this.isEditBranch) {
                this.branchService.updateBranch(this.createEditBranchForm.value.id, this.createEditBranchForm.value).subscribe(data => {
                    this.createEditBranchDialog = false;
                    this.getBranch();
                }, error => console.log(error));
            } else {
                this.branchService.createBranch(this.createEditBranchForm.value).subscribe(data => {
                    this.createEditBranchDialog = false;
                    this.getBranch();
                }, error => console.log(error));
            }
        }

        this.getBranch();
    }


    hideBranchDialog() {
        this.clickedSubmit = false;
        this.createEditBranchDialog = false;
        this.createEditBranchForm.reset();
    }

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
        if (this.createEditBranchForm.value?.state?.districts != null) {

            for (let i = 0; i < this.createEditBranchForm.value.state.districts.length; i++) {
                this.DistrictList.push({ 'label': this.createEditBranchForm.value?.state?.districts[i], 'value': this.createEditBranchForm.value?.state?.districts[i] });
            }

        } else {
            if (this.createEditBranchForm.value.state)
                this.selectedState = this.createEditBranchForm.value.state
            if (this.districtList != undefined) {
                for (let i = 0; i < this.districtList.length; i++) {
                    this.DistrictList.push({ 'label': this.districtList[i], 'value': this.districtList[i] });
                }
            }
        }

    }

    private getChangedValuesAndValidate(): boolean {
        // Validates all the inputs
        Object.values(this.createEditBranchForm.controls)
            .filter(control => !control.disabled)
            .forEach(formControl => formControl.updateValueAndValidity({ emitEvent: true }));

        if (this.createEditBranchForm.invalid) {
            if (true) {
                this.scrollToError();
            }
            return false;
        }

        return true;
    }


    scrollToError() {
        const firstElementWithError = document.querySelector('.ng-invalid');
        this.scrollTo(firstElementWithError);
    }

    scrollTo(el: Element | null) {
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

}
