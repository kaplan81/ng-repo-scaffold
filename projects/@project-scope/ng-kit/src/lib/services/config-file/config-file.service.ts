import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { ErrorService } from '../error/error.service';

export const configFileparams = new HttpParams()
  .set('configRequest', 'jsonFile')
  .append(`v`, `${new Date().getTime()}`);

// Module to import in an app so that IDE does not complain.
@NgModule()
export class ConfigFileModule {}

/**
 * Get config.json
 */
@Injectable({
  providedIn: ConfigFileModule
})
export class ConfigFileService {
  private _configs: any;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  get configs(): any {
    return this._configs;
  }

  set configs(configs: any) {
    this._configs = configs;
  }

  configFile<T>(): Observable<T> {
    return this.http.get<T>('config.json', { params: configFileparams }).pipe(
      tap((configFile: T) => (this.configs = configFile)),
      take(1),
      catchError(this.errorService.handleHttpError<T>('loadConfig'))
    );
  }
}
