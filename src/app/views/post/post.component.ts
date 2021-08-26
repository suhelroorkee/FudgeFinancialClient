import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Post } from '../../_models/Post';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { PostService } from '../../_services/post.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  users: User[];
  posts: Post[];
  allposts: Post[];
  model: any = {};
  cmodel: any = {};
  @ViewChild('infoModal') public infoModal: ModalDirective;

  constructor(private userService: UserService, private postService: PostService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadPosts();
    this.loadallPosts();
    this.loadUsers();
  }
  loadallPosts() {
    return this.postService.getallPosts().subscribe((allposts: Post[]) => {
      this.allposts = allposts;
      console.log(this.allposts);
    }, error => {
      this.alertify.error(error);
    });
  }
  loadPosts() {
    return this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts);
    }, error => {
      this.alertify.error(error);
    });
  }
  loadUsers() {
    return this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }
  register() {
    if (!this.model.name) {
      this.alertify.error('Enter name');
      return;
    }
    if (!this.model.name.trim()) {
      this.alertify.error('Invalid name');
      return;
    }
    if (!this.model.body) {
      this.alertify.error('Enter body');
      return;
    }
    if (!this.model.body.trim()) {
      this.alertify.error('Invalid body');
      return;
    }
    if (!this.model._id) {
      this.alertify.error('Select User');
      return;
    }
    this.model.user_id = this.model._id;
    this.postService.addpost(this.model).subscribe((posts: Post[]) => {
      this.loadPosts();
      this.model = {};
      this.alertify.success('Posted Successful');
      this.infoModal.hide();
    }, error => {
      this.alertify.error(error.error);
    });
  }
  comment(id: number) {
      const inputValue = (document.getElementById('comment_' + id) as HTMLInputElement).value;
      const userid = (document.getElementById('select_' + id) as HTMLInputElement).value;
      if (!inputValue) {
        this.alertify.error('Enter Comment');
        return;
      }
      if (!inputValue.trim()) {
        this.alertify.error('Invalid Comment');
        return;
      }
      if (userid === '0') {
        this.alertify.error('Select User');
        return;
      }
      this.cmodel.user_id = userid;
      this.cmodel.post_id = id;
      this.cmodel.body = inputValue;
      console.log(this.cmodel);
      this.postService.addcomment(this.cmodel).subscribe((posts: Post[]) => {
        this.loadPosts();
        this.model = {};
        this.alertify.success('Posted Successful');
        this.infoModal.hide();
      }, error => {
        this.alertify.error(error.error);
      });
  }

}
