import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../_models/Post';
import { Comment } from '../_models/Comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.baseUrl + 'post');

    }
    getallPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.baseUrl + 'post/all');

    }
    getComments(): Observable<Comment[]> {
      return this.http.get<Comment[]>(this.baseUrl + 'comment');

    }
    addpost(request: Post[]) {
      return this.http.post(this.baseUrl + 'post', request);
    }
    addcomment(request: Comment[]) {
      console.log(request);
      console.log(this.baseUrl + 'comment');
      return this.http.post(this.baseUrl + 'comment', request);
    }

}
