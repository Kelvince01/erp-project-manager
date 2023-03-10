import { IGroup } from '@models/group.model';
import { from, Observable } from 'rxjs';
import { FeathersService } from '@services/feathers.service';
import { IDepartment } from '@models/department.model';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IDepartmentSection } from '@models/department-section.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IDepartment): Observable<any> {
    return from(
      this.feathers
        .service('departments')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Department created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create department!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('departments').get(id));
  }

  departments$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('departments')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(payload: Partial<IDepartment>): Observable<any> {
    return from(
      this.feathers.service('departments').update(payload.DepartID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('departments').remove(id));
  }

  createSection(payload: IDepartmentSection): Observable<any> {
    return from(
      this.feathers
        .service('department-sections')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Department section created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create department section!',
          })
        )
    );
  }

  getSectionById(id: string): Observable<any> {
    return from(this.feathers.service('department-sections').get(id));
  }

  sections$(query?: any): Observable<any> {
    return from(
      this.feathers
        .service('department-sections')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  updateSection(payload: Partial<IDepartmentSection>): Observable<any> {
    return from(
      this.feathers
        .service('department-sections')
        .update(payload.DepartmentSectionID!, payload)
    );
  }

  deleteSection(id: number): Observable<any> {
    return from(this.feathers.service('department-sections').remove(id));
  }

  createGroup(payload: IGroup): Observable<any> {
    return from(
      this.feathers
        .service('groups')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({
            severity: 'success',
            detail: 'Group created.',
          })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create group!',
          })
        )
    );
  }

  getGroupById(id: string): Observable<any> {
    return from(this.feathers.service('groups').get(id));
  }

  groups$(query?: any): Observable<any> {
    return from(
      this.feathers.service('groups').find({ query: { $limit: 20, ...query } })
    );
  }

  updateGroup(payload: Partial<IGroup>): Observable<any> {
    return from(
      this.feathers.service('groups').update(payload.GroupID!, payload)
    );
  }

  deleteGroup(id: number): Observable<any> {
    return from(this.feathers.service('groups').remove(id));
  }
}
