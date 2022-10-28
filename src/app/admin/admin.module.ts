import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { BookComponent } from './book/book.component';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    BookComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
