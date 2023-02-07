import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeTableComponent } from './project-frontend/components/uikit/employeetable/employeetable.component';
import { AppLayoutComponent } from './project-frontend/layout/app.layout.component';
import { AuthGuard } from './project-frontend/services/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./project-frontend/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./project-frontend/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'employeeDetails', component: EmployeeTableComponent },
                ], canActivate: [AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./project-frontend/components/auth/auth.module').then(m => m.AuthModule) },

            { path: '**', redirectTo: 'pages/notfound' },



        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
