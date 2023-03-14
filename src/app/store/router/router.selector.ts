import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-Serializer";

export const getRouterstate=createFeatureSelector<
RouterReducerState<RouterStateUrl>
>('router');

export const getCurrentRoute = createSelector(getRouterstate,(router)=>{
    return router.state;
})

