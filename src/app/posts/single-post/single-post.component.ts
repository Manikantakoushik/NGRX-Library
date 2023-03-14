import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../post-list/state/post.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.less']
})
export class SinglePostComponent implements OnInit {
  post!:Observable<Post>;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {    
    this.post=this.store.select(getPostById).pipe(
      filter((post:any) => post !== null && post !== undefined)
    );;
  }

}
