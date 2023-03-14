import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { autoLogout } from "../auth/state/auth.action";
import { AuthResponseData } from "../models/AuthResponseData.model";
import { User } from "../models/user.model";



@Injectable({
    providedIn: 'root',
})
export class AuthService{
    timeoutInterval:any;
    constructor(private http:HttpClient,private store:Store){}

    login(email:string,password:string):Observable<AuthResponseData>{
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,{email,password,returnSecureToken: true})
    }
    signup(email:string,password:string):Observable<AuthResponseData>{
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,{email,password,returnSecureToken: true})
    }

    formatuser(data:AuthResponseData){
        const expirationDate= new Date(new Date().getTime() + +data.expiresIn*1000)
        const user = new User(data.email,data.idToken,data.localId,expirationDate);
        return user;
    }

    getErrorMessage(message:string){
        switch(message){
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Password is not valid Please Check';
            case 'USER_DISABLED':
                return 'This user is blocked bt admin';
            case 'EMAIL_EXISTS':
                return 'The email address is already Exist';
            case 'OPERATION_NOT_ALLOWED':
                return 'Password sign-in is disabled for this project'
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return 'We have blocked all requests from this device due to unusual activity. Try again after some time later.'
            default:
                return 'Unknown error occurred.Please check once and Try again';
        }
    }

    setUserInLocalStorage(user:User){
        localStorage.setItem('UserData',JSON.stringify(user));

        this.runTimeoutInterval(user);


    }

    runTimeoutInterval(user:User){
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval=expirationDate - todaysDate;

        this.timeoutInterval=setTimeout(()=>{
            this.store.dispatch(autoLogout());
            // Logout functionality or get refresh token
        },timeInterval)

    }

    getUserFromLocalStorage(){
        const userDataString = localStorage.getItem('UserData');
        if(userDataString){
            const userData = JSON.parse(userDataString);
            const expirationDate= new Date(userData.expirationDate);
            const user=new User(userData.email,userData.token,userData.localId,expirationDate);
            this.runTimeoutInterval(user);
            return user;
        }
        return null;
    }

    logout(){
        localStorage.removeItem('UserData');
        if(this.timeoutInterval){
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval= null;
        }
    }

}
