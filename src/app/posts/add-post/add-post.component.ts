import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../post-list/state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.less']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null,[Validators.required,Validators.minLength(6),
      ]),
      description: new FormControl(null,[
        Validators.required,
        Validators.minLength(10),
      ])
    })
  }

  showDescriptionErrors(){
    const discription =this.postForm.get('description');
    if(discription?.touched && discription.invalid){
      if(discription.errors?.['required']){
        return "Description is Required";
      }
      if(discription.errors?.['minlength']){
        return " Description should be minimum 10 Characters";
      }
    }
    return;

  }

  onAddPost(){
    
    if(!this.postForm.valid){
      return;
    }
    const post:Post = {
      title:this.postForm.value.title,
      description:this.postForm.value.description
    }
    this.store.dispatch(addPost({post}))
    
    
  }

}
