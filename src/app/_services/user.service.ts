import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.baseUrl + 'user');

    }

    getUser(id): Observable<User> {
      return this.http.get<User>(this.baseUrl + 'user/' + id);

    }

    updateUser(id: number, user: User) {
        return this.http.put(this.baseUrl + 'users/' + id, user);

    }
}
