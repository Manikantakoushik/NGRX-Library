import {  createReducer, on } from "@ngrx/store";
import { autoLogout, loginSuccess, signupSuccess } from "./auth.action";
import {  intialState } from "./auth.state";


const _authReducer= createReducer(intialState,on(loginSuccess,(state,action)=>{
    return {
        ...state,
        user:action.user,
    }
}),on(signupSuccess,(state,action)=>{
    return {
        ...state,
        user:action.user,
    }
}),on(autoLogout,(state)=>{
    return {...state,user:null,}
})

);

export function AuthReducer(state:any,action: any){
    return _authReducer(state,action);
}
