import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Post } from "../models/posts.model";

@Injectable({
    providedIn:'root',
})
export class PostService{
    constructor(private http:HttpClient){}

    getPosts(){
        return this.http.get<Post[]>(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts.json`)
        .pipe(
            map((data)=>{
                const posts:Post[]=[];
                for(let key in data){
                    posts.push({...data[key],id:key})
                }
                return posts;
            })
        )
    }

    addpost(post:Post):Observable<{name: string}>{
        return this.http.post<{name:string}>(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts.json`,post)
    }

    updatePost(post:Post){
        const postData={
            [(post?.id ?? '').toString()]:{title:post.title,description:post.description},
        }
        console.log("post data",postData);
        
        return this.http.patch(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts.json`,postData)

    }


    deletePost(id:String){
        return this.http.delete(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts/${id}.json`)
    }

    getPostById(id:String):Observable<Post>{
        return this.http.get<Post>(`https://angular-ngrx-e8c68-default-rtdb.firebaseio.com/posts/${id}.json`)
    }

}


