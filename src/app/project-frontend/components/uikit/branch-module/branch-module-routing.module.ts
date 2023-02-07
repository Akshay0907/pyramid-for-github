import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BranchListComponent } from './branch-list/branch-list.component';


// const routes: Routes =
//   [
//     {
//       path:'branch',
//      component: BranchListComponent,
//     },
//       {
//        path:'create-branch',
//       component:CreateBranchComponent

//       }
//      ];
const routes: Routes =
  [{path:'branch',component: BranchListComponent},
  //{path:'create-branch',component:CreateBranchComponent},
  //{path:'update-branch/:id',component:UpdateBranchComponent},

  {path:'',redirectTo:'branch',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchModuleRoutingModule { }
