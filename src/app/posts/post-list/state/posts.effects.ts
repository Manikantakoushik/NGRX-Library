import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction,routerNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { filter, map, mergeMap, switchMap, toArray } from "rxjs";
import { PostService } from "src/app/services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";

@Injectable()
export class PostEffects{
    constructor(private action$:Actions,private postsService:PostService){}

    loadPosts$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loadPosts),
            mergeMap((action)=>{
                return this.postsService.getPosts().pipe(
                    map((posts)=>{
                        return loadPostsSuccess({posts})
                    })
                );
            })
        )
    })

    addpost$=createEffect(
        ()=>{
           return this.action$.pipe(ofType(addPost),
            mergeMap((action)=>{
                return this.postsService.addpost(action.post).pipe(
                    map((data)=>{
                        console.log(data);      
                        const post = {...action.post,id:data.name}
                        return addPostSuccess({post})
                    })
                )
            }))
        }
    );

    updatePost$=createEffect(()=>{
        return this.action$.pipe(
            ofType(updatePost),switchMap((action)=>{
                return this.postsService.updatePost(action.post).pipe(
                    map((data)=>{
                        return updatePostSuccess({post:action.post})
                    })
                )
            })
        )
    })

    deletePost$=createEffect(()=>{
        return this.action$.pipe(
            ofType(deletePost),switchMap((action)=>{
                return this.postsService.deletePost(action.id).pipe(
                    map((data)=>{
                        return deletePostSuccess({id:action.id})
                    })
                )
            })
        )
    })

    getSinglePost$=createEffect(()=>{
        return this.action$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r:RouterNavigatedAction)=>{     
            return r.payload.routerState.url.startsWith('/post/details');
        }),
        map((r:RouterNavigatedAction)=>{
            // console.log(r.payload.routerState.url);
            let asd = r.payload.routerState.url.split('/')
            const id = asd[asd.length - 1];
            return id;
            // return r.payload.routerState.url;
        }),
        switchMap((id)=>{
            return this.postsService.getPostById(id).pipe(
                map((post)=>{
                    const postData=[{...post,id}];
                    return loadPostsSuccess({posts:postData});
                })
            );
        })
        );
    });

}