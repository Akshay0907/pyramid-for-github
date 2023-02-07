import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Employee } from '../model/employee';
import { NotificationService } from '../services/notification.service';
import { LayoutService } from "./service/app.layout.service";
import { Notification } from "../model/notification";


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
        `tr.read{
            background-color: white;

        }
        tr.notRead{
            background-color: #91b2bd;

        }
        #op {
    max-height: 300px;
    height: auto;
    overflow: auto;
    width: 450px;
}

        `
    ]

})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    products!: Employee[];
    notifications!: Notification[];
    UnreadNotifications!: Notification[];
    selectedProduct!: Employee;
    selectedNotification!: Notification;
    totalRecords!: any;

    constructor(public layoutService: LayoutService, private messageService: MessageService, private notificationService: NotificationService,) { }
    ngOnInit() {
        this.fetchNotifications()
        setInterval(() => {
            this.fetchUnreadNotifications()
            setTimeout(() => {
                if (this.UnreadNotifications.length > 0) {
                    this.fetchNotifications()
                }
            }, 1000);
        }, 10000);
    }
    forLogOut() {

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Loged Out Successfully', life: 3000 });
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Loged Out Successfully', life: 3000 });
    }

    fetchNotifications() {
        this.notificationService.getAllNotifications().subscribe(e => {
            this.notifications = e; console.log(e), console.log("all notifications", this.notifications);

        })
    }

    fetchUnreadNotifications() {
        this.notificationService.getUnreadNotifications().subscribe(e => {
            this.UnreadNotifications = e; console.log(e), console.log("Unread notifications", this.UnreadNotifications), this.totalRecords = e.length;

        })
    }

    markNotificationsAsRead() {
        let ids = new Array;
        this.UnreadNotifications.forEach(n => ids.push(n.id))
        console.log(this.UnreadNotifications)
        if (ids.length != 0) {
            this.notificationService.markNotificationsAsRead(ids).subscribe(e =>
                this.fetchUnreadNotifications()
            )
        }

    }
}
