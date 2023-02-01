import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  IFilter,
  ACTIONS as FilterACTIONS,
} from 'src/app/data/reducers/user-filter.reducer';
import * as Rx from 'rxjs';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  public name = new FormControl();
  public email = new FormControl();
  constructor(private store: Store<any>) {
    store.select('filter').subscribe((filter: IFilter) => {
      this.name.setValue(filter.name);
      this.email.setValue(filter.email);
    });
    Rx.Observable.merge(this.name.valueChanges, this.email.valueChanges)
      .debounceTime(1000)
      .subscribe(() => this.filter());
  }

  ngOnInit() {}

  filter() {
    this.store.dispatch({
      type: FilterACTIONS.UPDATE_FITLER,
      payload: {
        name: this.name.value,
        email: this.email.value,
      },
    });
  }

  clearFilter() {
    this.store.dispatch({
      type: FilterACTIONS.CLEAR_FITLER,
    });
  }
}
