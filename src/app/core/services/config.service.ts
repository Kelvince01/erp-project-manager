import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfig } from '@core/models/config.model';
// import Config from '@core/models/core.config';
import { environment } from '@envs/environment';
// import Config from 'chart.js/dist/core/core.config';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Config } from 'src/app/config';

export const configFactory = (config: ConfigService) => () =>
  config.loadAppConfig();

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  // keep track of config
  private config = new BehaviorSubject<IConfig>(Config as IConfig);
  config$: Observable<IConfig> = this.config.asObservable();

  private static _config: IConfig;

  static get Config(): IConfig {
    return this._config || Config;
  }

  private _createConfig(config: any, withError: boolean): void {
    // cast all keys as are
    const _config = { ...Config, ...(<IConfig>config) };

    // is severd
    _config.isServed = true;

    // with error
    _config.withError = withError;

    // set static member
    ConfigService._config = _config;

    // next
    this.config.next(config);
  }

  loadAppConfig(): Observable<boolean> {
    return this.http.get(environment.apiUrl).pipe(
      map((response) => {
        this._createConfig(response, false);

        return true;
      }),
      catchError((error) => {
        // if in error, return set fall back from environment
        this._createConfig(Config, true);
        console.log(error);
        return of(false);
      })
    );
  }

  getAppData() {
    //const currentLocation = window.location.origin;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get('./assets/data/app.data.json', { headers });
    //return this.http.get(currentLocation + '/assets/data/results.json', { headers });
  }
}
