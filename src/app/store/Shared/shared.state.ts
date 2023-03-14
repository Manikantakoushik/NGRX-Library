export interface SharedState {
    showLoading:boolean;
    errorMessage:string;
}

export const intialState:SharedState ={
    showLoading:false,
    errorMessage:'',
}
