import { increment,decrement, reset, customincrement, changename } from "./counter.action";
import { intialState } from "./counter.state";
import { Action, createReducer,on } from "@ngrx/store";

const _counterReducer = createReducer(
    intialState, 
    on(increment,(state)=>{
        return {
            ...state,
            counter:state.counter+1,
        }
    }),on(decrement,(state)=>{
        return {
            ...state,
            counter:state.counter-1,
        }
    }),on(reset,(state)=>{
        return {
            ...state,
            counter:0,
        }
    }),on(customincrement,(state,action)=>{
         return {
            ...state,
            counter:action.value + state.counter,
        }
    }),on(changename,(state)=>{
        return {
            ...state,
            Name:"Koushik"
        }
    })
)

export function counterReducer(state: any, action: Action){
    return _counterReducer(state,action)
}