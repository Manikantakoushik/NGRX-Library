import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { RouterStateUrl } from "src/app/store/router/custom-Serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { PostsState } from "./posts.state";

export const POSTS_STATE_NAME='posts'
const getPostState=createFeatureSelector<PostsState>(POSTS_STATE_NAME)

export const getPosts = createSelector(getPostState,(state)=>{
    return state.posts;
})

export const getPostById= createSelector(
    getPosts,
    getCurrentRoute,
    (posts,route:RouterStateUrl)=>{
        return posts? posts.find((post)=>post.id === route.params['id']):null;
    // return posts.find((post:Post)=>{
    //     return post.id=== route.params['id']});
})

