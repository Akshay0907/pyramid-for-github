import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PaidLeaveRule } from 'src/app/project-frontend/model/paid-leave-rule';
import { PaidLeaveRuleService } from 'src/app/project-frontend/services/paidLeaveRule.service';

@Component({
  selector: 'app-leave-rule',
  templateUrl: './leave-rule.component.html',
  styleUrls: ['./leave-rule.component.scss']
})
export class LeaveRuleComponent implements OnInit {

    ifDistrictSameBoolean: boolean = true;
    ifDistrictDifferentBoolean: boolean = true;


paidLeaveRuleForm!:FormGroup;

  constructor(private paidLeaveRuleService: PaidLeaveRuleService,
    private Router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paidLeaveRuleForm = this.fb.group({
        ifDistrictDifferent: ['', [Validators.required]],
        ifDistrictSame: ['', [Validators.required]]
    });


    this.paidLeaveRuleService.getPaidLeaveRule().subscribe(e => {

        this.paidLeaveRuleForm.patchValue({
            'ifDistrictSame':e.ifDistrictSame,
            'ifDistrictDifferent':e.ifDistrictDifferent,
        })
        console.log(this.paidLeaveRuleForm.value);
        console.log(e.name);
        console.log(this.paidLeaveRuleForm.value);
  });

}
Click() {

    this.ifDistrictDifferentBoolean = !this.ifDistrictDifferentBoolean;
    this.ifDistrictSameBoolean = !this.ifDistrictSameBoolean;

}
SaveParameters() {
    const paidLeaveRule = new PaidLeaveRule();
    paidLeaveRule.ifDistrictDifferent = this.paidLeaveRuleForm.value.ifDistrictDifferent;
    paidLeaveRule.ifDistrictSame = this.paidLeaveRuleForm.value.ifDistrictSame;



    this.paidLeaveRuleService.addPaidLeaveRule(paidLeaveRule).subscribe(() => {


        this.Click();
        alert("Saved Successfully");

    })
}



}
