import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

// Module to import in an app so that IDE does not complain.
@NgModule()
export class ErrorModule {}

/**
 * Generic error handlers.
 */
@Injectable({
  providedIn: ErrorModule
})
export class ErrorService {
  /**
   * Handle all HTTP call errors in the same way.
   */
  handleHttpError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error); // log to console instead
      const message =
        error.error instanceof ErrorEvent
          ? // A client-side or network error occurred.
            error.error.message
          : // A server-side or network error occurred.
            `Server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed::: ${message}`);
    };
  }
}
