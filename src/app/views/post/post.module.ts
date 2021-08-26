import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PostComponent],
  imports: [
    PostRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class PostModule { }
