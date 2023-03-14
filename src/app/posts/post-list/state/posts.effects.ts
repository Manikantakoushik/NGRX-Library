import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity";
import { RouterNavigatedAction,routerNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { filter, map, mergeMap, of, switchMap, toArray, withLatestFrom } from "rxjs";
import { dummyAction } from "src/app/auth/state/auth.action";
import { Post } from "src/app/models/posts.model";
import { PostService } from "src/app/services/posts.service";
import { AppState } from "src/app/store/app.state";
import { getPosts } from "./post.selector";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";

@Injectable()
export class PostEffects{
    constructor(private action$:Actions,private postsService:PostService,private store:Store<AppState>){}

    loadPosts$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loadPosts),withLatestFrom(this.store.select(getPosts)),
            mergeMap(([action,posts])=>{
                if(!posts.length || posts.length === 1){
                return this.postsService.getPosts().pipe(
                    map((posts)=>{
                        return loadPostsSuccess({posts})
                    })
                );
            }return of(dummyAction());
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
                        const updatePost:Update<Post>={
                            id:action.post.id??'0',
                            changes:{
                                ...action.post,
                            }
                        }
                        return updatePostSuccess({post:updatePost})
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
            // return r.payload.routerState['params']['id'];
        }),withLatestFrom(this.store.select(getPosts)),
        switchMap(([id,posts])=>{
            if(!posts.length){
            return this.postsService.getPostById(id).pipe(
                map((post)=>{
                    const postData=[{...post,id}];
                    return loadPostsSuccess({posts:postData});
                })
            );
        }
        return of(dummyAction())
        })
        );
    });

}