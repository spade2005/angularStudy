import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {BookComponent} from "./book/book.component";
import {PageComponent} from "./page/page.component";
import {AuthGuard} from "../guard/auth.guard";
import {BookCreateComponent} from "./book-create/book-create.component";
import {BookUpdateComponent} from "./book-update/book-update.component";

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'',
        canActivateChild: [AuthGuard],
        children:[
          {path:'user',component:UserComponent},
          {path:'book',component:BookComponent},
          {path:'book-create',component:BookCreateComponent},
          {path:'book-update',component:BookUpdateComponent},
          {path:'page',component:PageComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
