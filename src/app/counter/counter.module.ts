import { CustomCounterInputComponent } from './custom-counter-input/custom-counter-input.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterComponent } from './counter/counter.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterButtonComponent } from './counter-button/counter-button.component';
import { Store, StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { COUNTER_STATE_NAME } from './state/counter.selector';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
];

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonComponent,
    CustomCounterInputComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes),StoreModule.forFeature(COUNTER_STATE_NAME,counterReducer)],
})
export class CounterModule {}