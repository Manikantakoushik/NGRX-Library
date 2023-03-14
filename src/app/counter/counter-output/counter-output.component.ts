import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selector';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.less']
})
export class CounterOutputComponent implements OnInit,OnDestroy {
  counter: any;
  counterSubscription: Subscription = new Subscription;
  // @Input() counter: any;
  
  constructor(private store: Store<AppState>) { }
  
  ngOnInit() {
    this.counterSubscription=this.store.select(getCounter).subscribe((data)=>{
      console.log("counter observable is called");
      this.counter = data;
    })
  }
  
  
  ngOnDestroy(): void {
    if(this.counterSubscription){
   this.counterSubscription.unsubscribe();
  }
  }
}
