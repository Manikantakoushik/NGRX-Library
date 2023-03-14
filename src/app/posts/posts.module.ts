import { EditPostComponent } from './edit-post/edit-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './post-list/post-list/post-list.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './post-list/state/posts.reducer';
import { POSTS_STATE_NAME } from './post-list/state/post.selector';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './post-list/state/posts.effects';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      {
        path: 'edit/:id',
        component: EditPostComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [PostListComponent, AddPostComponent, EditPostComponent, SinglePostComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes),StoreModule.forFeature(POSTS_STATE_NAME,postReducer),
  EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostsModule {}