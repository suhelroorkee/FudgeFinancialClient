import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User;
  model: any = {};
  mymodel: any = {};
  res: any = {};
  @ViewChild('infoModal') public infoModal: ModalDirective;
  @ViewChild('EdituserModal') public EdituserModal: ModalDirective;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    return this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }
  register() {
    if (!this.model.firstname) {
      this.alertify.error('Enter Firstname');
      return;
    }
    if (!this.model.lastname) {
      this.alertify.error('Enter Lastname');
      return;
    }
    if (!this.model.username) {
      this.alertify.error('Enter Username');
      return;
    }
    if (!this.model.email) {
      this.alertify.error('Enter email');
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.model.email)) {
      this.alertify.error('Enter valid email');
      return;
    }
    if (!this.model.mobile) {
      this.alertify.error('Enter Mobile');
      return;
    }
    this.authService.adduser(this.model).subscribe((res) => {
      if(res.message==='User Added Successfully') {
        this.model = {};
        this.alertify.success(res.message);
        this.loadUsers();
        this.infoModal.hide();
      }else {
        this.alertify.error(res.message);
      }
    }, error => {
      if (error.error.Password !== undefined) {
        this.alertify.error(error.error.Password[0]);
      } else {
        this.alertify.error(error.error);
      }
    });
  }

  EditUser(id: number) {
    this.EdituserModal.show();
    return this.userService.getUser(id).subscribe((user: User) => {
      this.mymodel = user;
      console.log(this.mymodel);
    }, error => {
      this.alertify.error(error);
    });
  }
  EdituserPost() {
    if (!this.mymodel.firstname) {
      this.alertify.error('Enter firstname');
      return;
    }
    if (!this.mymodel.lastname) {
      this.alertify.error('Enter lastname');
      return;
    }
    if (!this.mymodel.username) {
      this.alertify.error('Enter username');
      return;
    }
    if (!this.mymodel.email) {
      this.alertify.error('Write email');
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mymodel.email)) {
      this.alertify.error('Enter valid email');
      return;
    }
    if (!this.mymodel.mobile) {
      this.alertify.error('Select mobile');
      return;
    }
    this.authService.EdituserPost(this.mymodel).subscribe((res) => {
      console.log(res);
      this.loadUsers();
      this.alertify.success('User Edited Successfully');
      this.EdituserModal.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

  omit_special_char(event: { charCode: any; }) {
    let k: number;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return(k === 8 || (k >= 48 && k <= 57));
  }


}
