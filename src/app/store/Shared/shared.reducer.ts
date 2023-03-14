import { createReducer, on } from "@ngrx/store";
import { intialState } from "./shared.state";
import { seterrormessage, setLoadingSpinner } from "./shared.action";

 const _sharedReducer = createReducer(intialState,on(setLoadingSpinner,(state,action)=>{
    return {...state,showLoading:action.status,};
}),on(seterrormessage,(state,action)=>{
    return {...state,errorMessage:action.message}
}));

export function SharedReducer(state:any,action:any){
    return _sharedReducer(state,action);
}
