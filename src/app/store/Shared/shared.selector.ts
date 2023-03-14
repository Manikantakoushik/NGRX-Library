import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_START_NAME='shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_START_NAME);

export const getLoading =createSelector(getSharedState,(state)=>{
    return state.showLoading;
})

export const getErrorMessage = createSelector(getSharedState,(state)=>{
    return state.errorMessage;
})
