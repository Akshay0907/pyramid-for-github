import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Reimbursement } from 'src/app/project-frontend/model/reimbursement';
import { ReimbursementService } from 'src/app/project-frontend/services/reimbursement.service';

@Component({
    selector: 'app-reimbursement',
    templateUrl: './reimbursement.component.html',
    styleUrls: ['./reimbursement.component.scss']
})
export class ReimbursementComponent implements OnInit {
    events1!: any;

    blockSpecialNumber: RegExp = /^[^<>*!0-9]+$/;

    reimbursementForm!: FormGroup;
    currentPetrolRateBoolean: boolean = true;
    assumedAverageBoolean: boolean = true;
    averageMaintenanceCostBoolean: boolean = true;
    // petrolRate: any = "petrolRate";
    // averageMaintenanceCost: any = "averageMaintenanceCost";
    // assumedAverage: any = "assumedAverage";
regex="^\d{1,5}\.?\d{0,2}$"
    content: any;
    a: any;




    //content = "$[ {{"+this.a+"\\over "+this.b+"} +"+this.c+" }=x]$";
    constructor(private reimbursementService: ReimbursementService,
        private router: Router, private fb: FormBuilder) { }

    ngOnInit() {
        this.reimbursementForm = this.fb.group({
            currentPetrolRate: ['', [Validators.required]],
            assumedAverage: ['', [Validators.required]],
            averageMaintenanceCost: ['', Validators.required],
            calculatedCost: ['', Validators.required],
        });


        this.reimbursementService.getTopReimbursement().subscribe(e => {

            this.reimbursementForm.patchValue({
                'currentPetrolRate':e.currentPetrolRate,
                'assumedAverage':e.assumedAverage,
                'averageMaintenanceCost': e.averageMaintenanceCost,
               'calculatedCost':e.calculatedCost,

            })
            console.log(this.reimbursementForm.value);
/*             this.reimbursementForm.value.currentPetrolRate = e.currentPetrolRate;
            this.reimbursementForm.value.assumedAverage = e.assumedAverage;
            this.reimbursementForm.value.averageMaintenanceCost = e.averageMaintenanceCost;*/
           // this.reimbursementForm.value.calculatedCost = e.calculatedCost;
            console.log(e.calculatedCost);
            console.log(this.reimbursementForm.value.calculatedCost);
           // console.log(this.reimbursementForm.value);
           // console.log(this.reimbursementForm.value.currentPetrolRate);
           // console.log(this.reimbursementForm.value.assumedAverage);
           // console.log(this.reimbursementForm.value.calculatedCost);

            this.content = "$[ {{" + this.reimbursementForm.value.currentPetrolRate + "\\over " + this.reimbursementForm.value.assumedAverage + "} +" + this.reimbursementForm.value.averageMaintenanceCost + " }=" + this.reimbursementForm.value.calculatedCost + "]$"

        }
        );




        this.showme();






    }

    showme() {
        console.log(this.reimbursementForm.value.currentPetrolRate);
    }
    Onchange() {

        console.log(this.reimbursementForm.value.currentPetrolRate);
        //this.a=e.value;
        this.reimbursementForm.value.calculatedCost = (Number)(this.reimbursementForm.value.currentPetrolRate / this.reimbursementForm.value.assumedAverage) + (Number)(this.reimbursementForm.value.averageMaintenanceCost);
        this.content = "$[{{" + this.reimbursementForm.value.currentPetrolRate + "\\over " + this.reimbursementForm.value.assumedAverage + "} +" + this.reimbursementForm.value.averageMaintenanceCost + " }=" + this.reimbursementForm.value.calculatedCost + "]$";

    }
    // atchange(){
    // console.log(this.b);
    //          this.x=(Number)(this.a/this.b)+(Number)(this.c);
    //          this.content = "$[ {{"+this.a+"\\over "+this.b+"} +"+this.c+" }="+this.x+"]$";
    //     console.log(this.x);
    //     }

    Click() {

        this.currentPetrolRateBoolean = !this.currentPetrolRateBoolean;
        this.assumedAverageBoolean = !this.assumedAverageBoolean;
        this.averageMaintenanceCostBoolean = !this.averageMaintenanceCostBoolean;

    }
    SaveParameters() {
        const reimbursement = new Reimbursement();
        reimbursement.currentPetrolRate = this.reimbursementForm.value.currentPetrolRate;
        reimbursement.assumedAverage = this.reimbursementForm.value.assumedAverage;
        reimbursement.averageMaintenanceCost = this.reimbursementForm.value.averageMaintenanceCost;
        reimbursement.calculatedCost = this.reimbursementForm.value.calculatedCost;


        this.reimbursementService.addReimbursement(reimbursement).subscribe(() => {


            this.Click();
            alert("Saved Successfully");

        })
    }
}

