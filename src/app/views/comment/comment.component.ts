import { Component, OnInit } from '@angular/core';
import { Comment } from '../../_models/Comment';
import { AlertifyService } from '../../_services/alertify.service';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments: Comment[];

  constructor(private postService: PostService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadComments();
  }
  loadComments() {
    return this.postService.getComments().subscribe((comments: Comment[]) => {
      this.comments = comments;
      console.log(this.comments);
    }, error => {
      this.alertify.error(error);
    });
  }

}
