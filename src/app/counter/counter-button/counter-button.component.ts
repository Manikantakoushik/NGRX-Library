import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { decrement, increment, reset } from '../state/counter.action';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.less']
})
export class CounterButtonComponent implements OnInit {

  @Output() increment = new EventEmitter();
  @Output() decrement = new EventEmitter();
  @Output() reset = new EventEmitter();
    constructor(private store:Store<AppState>) {}
  
    ngOnInit() {
    }
  
    onIncrement(){
      this.store.dispatch(increment());
      // this.increment.emit();
    }
    onDecrement(){
      this.store.dispatch(decrement());
      // this.decrement.emit();
    }
    onReset(){
      this.store.dispatch(reset());
      // this.reset.emit();
    }

}
