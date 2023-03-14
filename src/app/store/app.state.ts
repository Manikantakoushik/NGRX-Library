import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postReducer } from "../posts/post-list/state/posts.reducer";
import { PostsState } from "../posts/post-list/state/posts.state";
import { SharedState } from "./Shared/shared.state";
import {SHARED_START_NAME} from "./Shared/shared.selector";
import {SharedReducer} from "./Shared/shared.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthReducer } from "../auth/state/auth.reducer";
import { AuthState } from "../auth/state/auth.state";
import { RouterReducerState } from "@ngrx/router-store";
import { routerReducer } from "@ngrx/router-store";

export interface AppState{
    // counter:CounterState;
    // posts:PostsState;
    [AUTH_STATE_NAME]:AuthState;
    [SHARED_START_NAME]:SharedState;
    router:RouterReducerState;
}

export const appReducer ={
    // counter:counterReducer,
    // posts:postReducer,
    [SHARED_START_NAME]:SharedReducer,
    [AUTH_STATE_NAME]:AuthReducer,
    router:routerReducer,
}