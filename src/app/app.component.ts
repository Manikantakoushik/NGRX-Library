import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autologin } from './auth/state/auth.action';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/Shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'angular_template';
  showloading!:Observable<boolean>;
  errorMessage!:Observable<string>;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.showloading=this.store.select(getLoading);
    this.errorMessage=this.store.select(getErrorMessage);
    this.store.dispatch(autologin());
  }


}
