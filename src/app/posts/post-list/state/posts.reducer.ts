import { createReducer,on } from "@ngrx/store";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";

import { intialState, postsAdapter } from "./posts.state";



const _postReducer = createReducer(intialState,on(addPostSuccess,(state, action) => {
   return postsAdapter.addOne(action.post,{...state,count:state.count+1});
    }),on(updatePostSuccess,(state,action)=>{
        return postsAdapter.updateOne(action.post,state);
    }),on(deletePostSuccess,(state,{id})=>{
     return postsAdapter.removeOne(id,state)

    }),on(loadPostsSuccess,(state,action)=>{
        return postsAdapter.setAll(action.posts,{...state,count:state.count+1,});
    })); 

export function postReducer(state: any,action: any){
    return _postReducer(state,action);
}