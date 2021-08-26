import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'user/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  roleid: any =  Number(localStorage.getItem('RoleID'));
  constructor(private http: HttpClient) { }
  adduser(request: User[]) {
    console.log(request);
    return this.http.post<any>(this.baseUrl + '', request);
  }
  EdituserPost(request) {
    return this.http.put(this.baseUrl + '', request);
  }
}
