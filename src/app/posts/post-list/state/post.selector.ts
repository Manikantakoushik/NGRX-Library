import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { RouterStateUrl } from "src/app/store/router/custom-Serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postsAdapter, PostsState } from "./posts.state";

export const POSTS_STATE_NAME='posts'
const getPostState=createFeatureSelector<PostsState>(POSTS_STATE_NAME)
export const postsSelectors=postsAdapter.getSelectors();

export const getPosts = createSelector(getPostState,postsSelectors.selectAll)
export const getPostEntities=createSelector(getPostState,postsSelectors.selectEntities);

export const getPostById= createSelector(
    getPostEntities,
    getCurrentRoute,
    (posts,route:RouterStateUrl)=>{
        return posts? posts[route.params['id']]:null;
    // return posts.find((post:Post)=>{
    //     return post.id=== route.params['id']});
})

export const getCount=createSelector(getPostState,(state)=> state.count)

