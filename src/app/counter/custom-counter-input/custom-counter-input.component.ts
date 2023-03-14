import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { changename, customincrement } from '../state/counter.action';
import { getName } from '../state/counter.selector';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.less']
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  Name!:any;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getName).subscribe((data)=>{
      console.log("Name Observable is called");
      this.Name=data;
    })
  }

  add(){
    this.store.dispatch(customincrement({ value:this.value}))
  }

  ChangeName(){
    this.store.dispatch(changename())
  }

}
