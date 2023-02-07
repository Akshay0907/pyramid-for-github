import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, Observer } from 'rxjs';
import { Holiday } from 'src/app/project-frontend/model/holiday';
import { HolidayService } from 'src/app/project-frontend/services/holiday.service';


@Component({
    selector: 'app-holiday-list',
    templateUrl: './holiday-list.component.html',
    styleUrls: ['./holiday-list.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class HolidayListComponent implements OnInit {

    cols: any[] = [];

    holidays: Holiday[] = [];



    holiday2: Holiday[] | undefined;

    holiday!: Holiday;

    demolist: Holiday[] = [];



    selectedHolidays: Holiday[] = [];

    deleteholidayDialog: boolean = false;

    deleteProductsDialog: boolean = false;


    holidayDialog: boolean = false;

    submitted: boolean = false;

    selectedProducts: Holiday[] = [];

    holidayObject: Holiday = new Holiday();

    holidayObjectForEdit: Holiday = new Holiday();

    holidayObjectForDelete: Holiday = new Holiday();

    holidayDialogForEdit: boolean = false;

    holidayObjectForSelectedDelete: String = "";



    addHolidayForm!: FormGroup;
    editBoolean: boolean=false;
    deleteIds!: any[];


    constructor(private messageService: MessageService, private holidayService: HolidayService) {

    }

    ngOnInit(): void {

        this.getHoliday();

        this.addHolidayForm = new FormGroup({
            'id':new FormControl(''),
            'name': new FormControl('', [Validators.required, Validators.maxLength(20)]),
            'description': new FormControl('', [Validators.maxLength(40)]),
            'date': new FormControl('', [Validators.required]),

        })
    }


    getHoliday() {
        this.selectedHolidays = [];
        this.holidayService.getHolidayList().subscribe((data) => {
            this.demolist = data;
        })
    }


    openNew(holiday: Holiday) {
        this.submitted = false;
        this.holidayDialog = true;
        this.getHoliday();
    }

    editHoliday(holiday: Holiday) {

        this.editBoolean = true;
        this.forUpdateOrEditHoliday(holiday);
        this.holidayDialog = true;
        this.getHoliday();
    }


    forUpdateOrEditHoliday(holiday: Holiday) {
        console.log(holiday)
        this.addHolidayForm.patchValue({
            id: holiday.id,
            name: holiday.name,
            description: holiday.description,
            date: new Date(holiday.date)
        });
        console.log(this.addHolidayForm);
    }


    deleteHoliday(holiday: Holiday) {
        this.deleteholidayDialog = true;
        this.holidayObjectForDelete = holiday;
this.getHoliday()

    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    deleteSelectedProducts(holiday: Holiday[]) {
        this.deleteIds=[]
        let ids = new Array;
        holiday.forEach(holiday => ids.push(holiday.id))
        this.deleteProductsDialog = true;
        this.deleteIds=ids;
        this.getHoliday()
    }


    hideDialog() {
        this.addHolidayForm.reset();
        this.holidayDialog = false;
        this.submitted = false;
        this.editBoolean=false;
    }
    extractValues(holiday: Holiday) {
        holiday.name = this.addHolidayForm.value.name;
        holiday.description = this.addHolidayForm.value.description;
        holiday.date = this.addHolidayForm.value.date;
    }


    saveProduct() {
        console.log(this.addHolidayForm.value)
        //this.addHolidayForm.reset();
        if(this.editBoolean==false){
        this.submitted = true;
        const holidayObjectForSave = new Holiday();
        this.extractValues(holidayObjectForSave);
        console.log(holidayObjectForSave)
        this.holidayService.createHoliday(holidayObjectForSave).subscribe(data => {

            this.holidayDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Holiday Saved', life: 3000 });
            this.getHoliday();

        },
            error => console.log(error)
        )
        // this.addHolidayForm.reset();
        this.getHoliday();
    }if(this.editBoolean==true){
        this.submitted = true;
        const holidayObjectForSave = new Holiday();
        this.extractValues(holidayObjectForSave);
        console.log(holidayObjectForSave)
        this.holidayService.updateHoliday(this.addHolidayForm.value.id,holidayObjectForSave).subscribe(data => {

            this.holidayDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Holiday Saved', life: 3000 });
            this.getHoliday();
            this.editBoolean=false

        },
            error => console.log(error)
        )
    }
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;

         this.holidayService.deleteHolidays(this.deleteIds).subscribe(data => {

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        }, error => console.log(error))
        // this.holidays = this.holidays.filter(val => !this.selectedProducts.includes(val));
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });

        setTimeout(() => {
            console.log(this.selectedProducts.length)

            this.getHoliday()
        }, 100);
    }

    confirmDelete() {
        this.deleteholidayDialog = false;
        this.holidayService.deleteHolidays(this.holidayObjectForDelete.id).subscribe();
        // this.holidays = this.holidays.filter(val => val.id !== this.holiday.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
setTimeout(() => {
    this.getHoliday()
}, 100);



        //this.holiday = {};
    }

    saveHolidayForEdit(id: number, holiday: Holiday) {
        this.holidayService.updateHoliday(id, holiday).subscribe(data => {

            holiday = data
            this.holidayDialog = false;
            this.getHoliday();
        }, error => console.log(error));
        this.getHoliday();
    }



}
