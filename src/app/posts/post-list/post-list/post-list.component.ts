import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from '../state/post.selector';
import { deletePost, loadPosts } from '../state/posts.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent implements OnInit {
  posts!: Observable<Post[]>;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.posts= this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onPostDelete(id:string){
    if(confirm('Are you sure you want to delete the post')){
      this.store.dispatch(deletePost({id}))
    }

  }

}
