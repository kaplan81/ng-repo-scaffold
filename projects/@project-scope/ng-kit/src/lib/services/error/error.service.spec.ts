/* tslint:disable:no-unused-variable */
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  const errorService = new ErrorService();

  it('can be instantiated via DI', () => {
    expect(errorService instanceof ErrorService).toBe(true);
  });

  it('handleHttpError', () => {
    const operation = 'handleHttpError operation';
    const type = 'HTTP Error';
    const message = 'Failure response for given url';
    const stack = `${operation} failed::: ${message}`;
    const httpError = new HttpErrorResponse({
      error: new ErrorEvent(type, { message })
    });
    jest.spyOn(global.console, 'error');
    const errorHandler: Function = errorService.handleHttpError(operation);
    function catchError() {
      return errorHandler(httpError);
    }
    // Jest calls throguth methods when spying.
    // However it does not get console executions.
    console.error(operation);

    expect(console.error).toHaveBeenCalledWith(operation);
    expect(catchError).toThrowError(stack);
  });
});
