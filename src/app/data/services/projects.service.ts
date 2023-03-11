import { Injectable } from '@angular/core';
import { IProject } from '@models/project.model';
import { MessageService } from 'primeng/api';
import { from, Observable } from 'rxjs';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(
    private feathers: FeathersService,
    private messages: MessageService
  ) {}

  create(payload: IProject): Observable<any> {
    return from(
      this.feathers
        .service('projects')
        .create({
          ...payload,
        })
        .then(() =>
          this.messages.add({ severity: 'success', detail: 'Project created.' })
        )
        .catch((err: any) =>
          this.messages.add({
            severity: 'error',
            detail: 'Could not create project!',
          })
        )
    );
  }

  getById(id: string): Observable<any> {
    return from(this.feathers.service('projects').get(id));
  }

  projects$(query?: any): Observable<any> {
    // get(query?: any) {
    return from(
      this.feathers
        .service('projects')
        .find({ query: { $limit: 20, ...query } })
    );
  }

  update(id: string, payload: Partial<IProject>): Observable<any> {
    return from(
      this.feathers.service('projects').patch(payload.ProjectID!, payload)
    );
  }

  delete(id: number): Observable<any> {
    return from(this.feathers.service('projects').remove(id));
  }
}
