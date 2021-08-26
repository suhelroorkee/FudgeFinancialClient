import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class UsersModule { }
