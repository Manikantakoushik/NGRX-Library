import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { getPostById } from '../post-list/state/post.selector';
import { updatePost } from '../post-list/state/posts.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less']
})
export class EditPostComponent implements OnInit,OnDestroy {
  post!: Post;
  postForm!:FormGroup;
  postSubscription!:Subscription;

  constructor(private store:Store,private router:Router) { }

  ngOnInit(): void {
    this.createForm();
    this.postSubscription=this.store.select(getPostById).subscribe((post)=>{
      if(post){
      this.post=post;
      this.postForm.patchValue({
        title:post?.title,
        description:post?.description,
      });
    }
    })

    // this.route.paramMap.subscribe((params)=>{
    //   const id=params.get('id');
    //  this.postSubscription=this.store.select(getPostById,{id}).subscribe((data)=>{
    //     this.post= data;
    //     this.createForm();
    //   })
    // }) 
  }

  createForm(){
    this.postForm= new FormGroup({
      title:new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
      ]),description: new FormControl(null,[
        Validators.required,
        Validators.minLength(10),
      ])
    })
    
  }
  
  onSubmit(){
    if(!this.postForm.valid){
      return;
    }
    // const title=this.postForm.value.title;
    // const description=this.postForm.value.description;
    
    const post:Post ={
      id:this.post.id,
      title:this.postForm.value.title,
      description:this.postForm.value.description
    }
    
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['/post']);

  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
