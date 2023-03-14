import { createReducer,on } from "@ngrx/store";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";

import { intialState } from "./posts.state";



const _postReducer = createReducer(intialState,on(addPostSuccess,(state, action) => {
    let post= {...action.post};
    // post.id=(state.posts.length + 1).toString();
    return {...state,posts:[...state.posts,post]};
    }),on(updatePostSuccess,(state,action)=>{
        const updatedPosts=state.posts.map((post)=>{
            return action.post.id === post.id ? action.post : post;
        });
        return{...state,posts:updatedPosts,}

    }),on(deletePostSuccess,(state,action)=>{
     const updatePosts= state.posts.filter((post)=>{
        return post.id !== action.id;
     });
     return {...state,posts:updatePosts}

    }),on(loadPostsSuccess,(state,action)=>{
        return {
            ...state,
            posts:action.posts,
        }
    })); 

export function postReducer(state: any,action: any){
    return _postReducer(state,action);
}