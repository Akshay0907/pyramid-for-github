import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { LayoutService } from 'src/app/project-frontend/layout/service/app.layout.service';

import { AuthenticationRequest } from 'src/app/project-frontend/model/authenticationRequest';
import { AuthService } from 'src/app/project-frontend/services/auth.service';
import { LoginService } from 'src/app/project-frontend/services/login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [ConfirmationService]
})
export class LoginComponent {
    submitted!: boolean;
    valCheck: string[] = ['remember'];
    userName!: string;
    password!: string;
    authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
    responsedata: any;
    forgetPasswordForm!: FormGroup;
    productDialog : boolean =false;
    constructor(public layoutService: LayoutService, private service: AuthService,
        private router: Router, private messageService: MessageService, private loginService:LoginService
    ) { localStorage.clear(); }



    login = new FormGroup({
        userName: new FormControl(""),
        password: new FormControl("")
    });

    ngOnInit(): void {
        this.submitted = false;
        this.forgetPasswordForm=new FormGroup({
            'userName' : new FormControl('',[Validators.required]),
            'password' : new FormControl('',[Validators.required,Validators.minLength(6)])

           })
    }
    inChange() {
        this.submitted = false;
        this.login.patchValue({
            'userName': this.userName,
            'password': this.password,


        });
    }

    ProceedLogin() {

        if (this.login.valid) {
            this.service.ProceedLogin(this.login.value).subscribe(result => {
                console.log(result);
                if (result != null) {

                    this.responsedata = result;
                    localStorage.setItem('token', this.responsedata.accessToken)

                    this.router.navigate([''])
                }

            }, ((err: any) => {
                if (err.status === 401) {
                    this.submitted = true;
                    
                    this.messageService.add({ key: 'tst', severity: 'error', summary: '', detail: 'Authentication Failed', life: 3000 });
                }

            }));

        }

    }

    cancelButton(){
        console.log(this.forgetPasswordForm.value);
        this.productDialog=false
    }

    requestButton(){

        this.productDialog=false
        this.loginService.forgotPassword(this.forgetPasswordForm.value.userName,this.forgetPasswordForm.value.password).subscribe(e => {
                 console.log("coming in method");
                 this.messageService.add({ key: 'tst',severity: 'success', summary: 'Successful', detail: 'Change Password Request Email Sent Successfully', life: 3000 });
                console.log("mnmcnmcvnmcv");
                },error => console.log(error));

            //  this.productDialog=false
    }

    //    userNameDomain(control:AbstractControl) : {[key:string]:any} | null {
    //     const userName: string=control.value;
    //     this.service.userExistsMethod(userName).subscribe( data => {
    //         console.log("data====>",data)
    //         this.variable=data
    //     })
    //         if(this.variable==true)
    //             {return {'userName':true};}

    //         else
    //         {return null}

    // }

    clickablebutton() {
        //this.router.navigate(['employeeka']);
        this.productDialog=true

        // this.service.forgetPasswordMethod(this.forgetPasswordForm.value.userName,this.forgetPasswordForm.value.password).subscribe(e => {
        //     console.log("coming in method");
        // },error => console.log(error))
    }
}
