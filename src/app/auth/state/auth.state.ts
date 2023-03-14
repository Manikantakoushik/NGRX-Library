import { User } from "src/app/models/user.model";

export interface AuthState{
    user:User | null;
}

export const intialState:AuthState = {
    user: null,
};
