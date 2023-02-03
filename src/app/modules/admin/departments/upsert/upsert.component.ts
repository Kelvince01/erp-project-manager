import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { IDepartment } from 'src/app/data/models/department.model';
import { selectAppState } from 'src/app/data/selectors/app.selector';
import { selectDepartmentById } from 'src/app/data/selectors/department.selector';
import { setAPIStatus } from 'src/app/data/stores/app.action';
import { Appstate } from 'src/app/data/stores/appstate';
import {
  invokeSaveNewDepartmentAPI,
  invokeUpdateDepartmentAPI,
} from 'src/app/data/stores/departments.action';

@Component({
  selector: 'app-upsert-department',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  departmentForm: IDepartment = {
    DepartID: 0,
    Department: '',
    Description: '',
    // cost: 0,
  };
  // form: FormGroup;
  id: string = '';
  isAddMode: boolean = false;
  loading = false;
  submitted = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      let fetchData$ = this.route.paramMap.pipe(
        switchMap((params) => {
          var id = Number(params.get('id'));
          return this.store.pipe(select(selectDepartmentById(id)));
        })
      );
      fetchData$.subscribe((data) => {
        if (data) {
          this.departmentForm = { ...data };
        } else {
          this.router.navigate(['/admin/departments']);
        }
      });
    }
  }

  save() {
    this.store.dispatch(
      invokeSaveNewDepartmentAPI({ newDepartment: this.departmentForm })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/admin/departments']);
      }
    });
  }

  udapte() {
    this.store.dispatch(
      invokeUpdateDepartmentAPI({
        updateDepartment: { ...this.departmentForm },
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/admin/departments']);
      }
    });
  }
}